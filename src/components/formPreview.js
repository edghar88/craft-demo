import React, {useState} from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const FormPreview = ({ settings, toggle }) => {

  const [selected, setSelected] = useState(settings.defaultValue);
  
  const orderedChoices = () => {
    const newChoices = () => {
      if((settings.choices.indexOf(settings.defaultValue) === -1) && settings.defaultValue !== '') {
        return [...settings.choices, settings.defaultValue]
      }
      return settings.choices;
    }
    switch (settings.order) {
      case 'alpha':
        return newChoices().sort();
      case 'reverse':
        return newChoices().sort().reverse();
      case 'index':
      default:
        return newChoices();
    }
  }

  function updateSelected(event) {
    setSelected(event.target.value);
  }
  
  return (
    <div className="add-choice-prompt">
      <Modal backdrop={true} show={settings.previewVisible}>
        <Modal.Body>
          <h4 style={{marginBottom: "15px"}}>Preview Field</h4>
          <Row>
            <Col sm="3">
              {settings.label}
            </Col>
            <Col sm="9">
              <Form.Control as="select" value={selected} onChange={() => updateSelected} multiple={settings.type === 'multi'}>
                {orderedChoices().map(c => <option key={`option-${c}`}>{c}</option>)}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Button variant="link" onClick={toggle}>Cancel</Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div> 
  )
}

export default FormPreview;