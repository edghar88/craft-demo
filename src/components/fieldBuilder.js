import React, { Component } from 'react';
import { Row, Col, Card, Form, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddChoicePrompt from './addChoicePrompt';
import '../assets/styles/field-builder.css'

const initialState = {
  label: '',
  type: 'single',
  required: false,
  defaultValue: '',
  newChoice: '',
  choices: [],
  order: 'alpha',
  modalVisible: false,
  invalidChoice: false,
  selectedChoice: null,
};

class FieldBuilder extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  addChoice = () => {
    if (this.state.newChoice.length > 0 && this.state.choices.indexOf(this.state.newChoice) === -1) {
      this.toggleModal();
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

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
  }

  updateChoice = (event) => {
    this.setState({
      newChoice: event.target.value,
    })
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
                  </Col>
                </Row>
                <Row className="form-set">
                  <Col md="3">
                    Type
                  </Col>
                  <Col md="3">
                    <Form.Control id="type-selector" onChange={this.updateType} as="select">
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
                    <AddChoicePrompt visible={this.state.modalVisible} update={this.updateChoice} submit={this.addChoice} toggle={this.toggleModal} currentChoices={this.state.choices} invalid={this.state.invalidChoice} />
                  </Col>
                  <Col md="1">
                    <Button variant="success" size="sm" onClick={this.toggleModal}><FontAwesomeIcon icon="plus" /></Button>
                    <br />
                    <Button style={{display: `${this.state.selectedChoice !== null ? 'block' : 'none'}`}} onClick={() => this.deleteChoice(this.state.selectedChoice)} variant="success" size="sm"><FontAwesomeIcon icon="trash-alt" /></Button>
                  </Col>
                </Row>
                <Row className="form-set">
                  <Col md="3">
                    Order
                  </Col>
                  <Col md="7">
                    <Form.Control as="select">
                      <option>Alphabetical Order</option>
                      <option>Reverse Alphabetical Order</option>
                      <option>Order Added</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 7, offset: 3 }}>
                    <Button variant="success" onClick={this.submitBuiltFields}>Save Changes</Button>
                    <Button variant="link" onClick={this.clearForm}>Clear Form</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}

export default FieldBuilder;