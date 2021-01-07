import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import LoginForm from "./LoginForm";

const LoginModal = ({ handleLogin }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="light" onClick={() => setShow(true)}>
        Logg inn
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Logg inn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleLogin={handleLogin}></LoginForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
