import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

const AddChoicePrompt = ({ visible, update, submit, toggle, invalid }) => {
  return (
    <div className="add-choice-prompt">
      <Modal backdrop={true} show={visible} onHide={toggle}>
        <Modal.Body>
          <h4 style={{marginBottom: "15px"}}>Add Choice</h4>
          <Form.Control placeholder="Enter Choice Name" onChange={update} />
          {invalid ? <small style={{color: "red"}}>Please enter a valid choice that does not yet exist.</small> : null}
          <div style={{marginTop: "20px", textAlign: "right"}}>
            <Button variant="success" onClick={submit}>Add Choice</Button>
            <Button variant="link" onClick={toggle}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div> 
  )
}

export default AddChoicePrompt;