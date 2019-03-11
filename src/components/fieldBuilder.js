import React, { Component } from 'react';
import { Row, Col, Card, Form, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddChoicePrompt from './addChoicePrompt';
import FormPreview from './formPreview';
import { postField } from '../services/service'
import '../assets/styles/field-builder.css'

const initialState = {
  choices: [],
  defaultValue: '',
  formComplete: false,
  invalidChoice: false,
  label: '',
  newChoice: '',
  order: 'alpha',
  previewVisible: false,
  promptVisible: false,
  required: false,
  selectedChoice: null,
  type: 'single',
};

class FieldBuilder extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidUpdate(prevState) {
    if (prevState.defaultValue !== this.state.defaultValue || prevState.label !== this.state.label || prevState.choices !== this.state.choices) {
      const formState = this.checkForm();
      if (formState !== this.state.formComplete) {
        this.setState({
          formComplete: formState
        })
      }
    }
  }

  addChoice = () => {
    if (this.state.newChoice.length > 0 && this.state.newChoice !== this.state.defaultValue && this.state.choices.indexOf(this.state.newChoice) === -1 && this.state.choices.length <= 49) {
      this.toggleChoiceModal();
      this.setState({
        choices: [...this.state.choices, this.state.newChoice],
        invalidChoice: false,
        newChoice: '',
        selectedChoice: null,
      })
    } else {
      this.setState({
        invalidChoice: true,
      })
    }
  }

  checkForm = () => {
    const state = this.state;
    return ((state.choices.length > 0 || state.defaultValue !== '') && state.label !== '');
  }

  clearForm = () => {
    this.setState(initialState);
  }

  deleteChoice = (index) => {
    const newChoices = this.state.choices.filter(c => c !== this.state.choices[index]);
    this.setState({
      choices: newChoices,
      newChoice: '',
      selectedChoice: null,
    })
  }

  selectChoice = (choice) => {
    this.setState({
      selectedChoice: this.state.choices.indexOf(choice),
    })
  }

  submitBuiltFields = () => {
    const newChoices = () => {
      if((this.state.choices.indexOf(this.state.defaultValue) === -1) && this.state.defaultValue !== '') {
        return [...this.state.choices, this.state.defaultValue]
      }
      return this.state.choices;
    }
    const request = {
      choices: newChoices(),
      defaultValue: this.state.defaultValue,
      label: this.state.label,
      order: this.state.order,
      required: this.state.required,
      type: this.state.type,
    }
    console.log("REQUEST: ", request)
    postField(request);
  }

  toggleChoiceModal = () => {
    this.setState({
      promptVisible: !this.state.promptVisible,
    })
  }

  togglePreviewModal = () => {
    this.setState({
      previewVisible: !this.state.previewVisible,
    })
  }

  updateChoice = (event) => {
    this.setState({
      newChoice: event.target.value,
    })
  }

  updateOrder = () => {
    const val = document.getElementById('order-selector').value;
    this.setState({
      order: (val === 'Alphabetical Order') ? 'alpha' : 'reverse',
    });
  }

  updateType = () => {
    const val = document.getElementById('type-selector').value;
    this.setState({
      type: (val === 'Single') ? 'single' : 'multi',
    });
  }

  render() {
    return (
      <div className="field-builder-container">
        <Row noGutters>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header as="h5">Field Builder</Card.Header>
              <Card.Body>
                <Row className="form-set">
                  <Col md="3">
                    Label
                  </Col>
                  <Col md="7">
                    <Form.Control placeholder="Enter Field Label" value={this.state.label} onChange={(event) => this.setState({label: event.target.value})} />
                    {this.state.label === '' ? <small style={{color: "red"}}>Label is required.</small> : null}
                  </Col>
                </Row>
                <Row className="form-set">
                  <Col md="3">
                    Type
                  </Col>
                  <Col md="3">
                    <Form.Control as="select" id="type-selector" onChange={this.updateType}>
                      <option>Single</option>
                      <option>Multi-Select</option>
                    </Form.Control>
                  </Col>
                  <Col md="3">
                    <Form.Check type="checkbox" onClick={(event) => this.setState({required: event.target.checked})} label="A Value is Required" />
                  </Col>
                </Row>
                <Row className="form-set">
                  <Col md="3">
                    Default Value
                  </Col>
                  <Col md="7">
                    <Form.Control placeholder="Enter Default Value" value={this.state.defaultValue} onChange={(event) => this.setState({defaultValue: event.target.value})} />
                  </Col>
                </Row>
                <Row className="form-set">
                  <Col md="3">
                    Choices
                  </Col>
                  <Col md="7">
                    <ListGroup className="choices-list">
                      {this.state.choices.map(c => {
                        return <ListGroup.Item className={this.state.choices[this.state.selectedChoice] === c ? 'selected-choice' : ''} key={`item-${c}`} onClick={() => this.selectChoice(c)}>{c}</ListGroup.Item>;
                      })}
                    </ListGroup>
                    <AddChoicePrompt visible={this.state.promptVisible} update={this.updateChoice} submit={this.addChoice} toggle={this.toggleChoiceModal} collectionSize={this.state.choices.length} invalid={this.state.invalidChoice} />
                  </Col>
                  <Col md="1">
                    <Button variant="success" size="sm" onClick={this.toggleChoiceModal}><FontAwesomeIcon icon="plus" /></Button>
                    <Button style={{marginTop: "10px", display: `${this.state.selectedChoice !== null ? 'block' : 'none'}`}} onClick={() => this.deleteChoice(this.state.selectedChoice)} variant="success" size="sm"><FontAwesomeIcon icon="trash-alt" /></Button>
                  </Col>
                </Row>
                <Row className="form-set">
                  <Col md="3">
                    Order
                  </Col>
                  <Col md="7">
                    <Form.Control as="select" id="order-selector" onChange={this.updateOrder}>
                      <option>Alphabetical Order</option>
                      <option>Reverse Alphabetical Order</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 7, offset: 3 }}>
                    <Button variant="success" disabled={!this.state.formComplete} onClick={this.submitBuiltFields}>Save Changes</Button>
                    <Button variant="link" onClick={this.clearForm}>Clear Form</Button>
                    {this.state.formComplete ? <Button variant="info" style={{float: 'right'}} onClick={this.togglePreviewModal}>Preview Field</Button> : null}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            {this.state.previewVisible ? <FormPreview settings={this.state} toggle={this.togglePreviewModal} /> : null}
          </Col>
        </Row>
      </div>
    )
  }

}

export default FieldBuilder;