import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

const AddChoicePrompt = ({ collectionSize, visible, update, submit, toggle, invalid }) => {
  function updateCountdown() {
    const el = document.getElementById('choice-entry');
    if(el) {
      return 40 - el.value.length;
    }
    return 40;
  }
  
  return (
    <div className="add-choice-prompt">
      <Modal backdrop={true} show={visible} onHide={toggle}>
        <Modal.Body>
          <h4 style={{marginBottom: "15px"}}>Add Choice</h4>
          <Form.Control id="choice-entry" placeholder="Enter Choice Name" onChange={update} disabled={collectionSize >= 50} />
          <small style={updateCountdown() < 0 ? {color: "red", float: "right"} : {float: "right"}} className="choice-countdown">{updateCountdown()} characters remaining.</small>
          {collectionSize >= 50 ? <small style={{color: "red"}}>No more than 50 choices can be added.</small> : null}
          {invalid ? <small style={{color: "red"}}>Please enter a valid choice that does not yet exist.</small> : null}
          <div style={{marginTop: "20px", textAlign: "right"}}>
            <Button variant="success" onClick={submit} disabled={collectionSize >= 50 || updateCountdown() < 0}>Add Choice</Button>
            <Button variant="link" onClick={toggle}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div> 
  )
}

export default AddChoicePrompt;