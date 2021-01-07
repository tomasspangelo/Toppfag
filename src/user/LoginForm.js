import React, { useState, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { LoginContext } from "../App";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loginFail } = useContext(LoginContext);

  return (
    <Form
      onSubmit={(e) => {
        handleLogin(e, username, password);
      }}
    >
      <Form.Group as={Row} controlId="formHorizontalUsername">
        <Form.Label column sm={2}>
          Username
        </Form.Label>
        <Col>
          <Form.Control
            type="text"
            placeholder="Brukernavn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Passord
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="password"
            placeholder="Passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Row>
        {loginFail && (
          <Col className="text-danger">Brukernavn eller passord er feil!</Col>
        )}
      </Row>
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Logg inn</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
