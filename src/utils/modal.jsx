import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function modal(props) {
  let handleClick = () => {
    props.data.handleConfirm("Yes");
  };
  return (
    <Modal
      {...props}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.heading}
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body> */}
      <Modal.Footer>
        <Button onClick={() => handleClick()}>Yes</Button>
        <Button onClick={props.handleclose}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default modal;
