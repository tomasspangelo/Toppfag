import React, { useContext } from "react";
import { useFormik } from "formik";

import { Button, Col, Form, Row } from "react-bootstrap";
import { LoginContext } from "../App";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Du må ha et brukernavn.";
  } else if (values.username.length > 150) {
    errors.username = "Brukernavnet kan ikke ha flere 150 symboler.";
  } else if (!/^[a-z0-9@.+-_]*$/i.test(values.username)) {
    errors.username =
      "Bruknavnet kan kun inneholde bokstaver, tall og @/./+/-/_ ";
  } else if (/[`~,<>;':"/[\]|{}()=]/.test(values.username)) {
    errors.username =
      "Bruknavnet kan kun inneholde bokstaver, tall og @/./+/-/_ ";
  }

  if (!values.password) {
    errors.password = "Du må ha et passord.";
  } else if (values.password.length < 8) {
    errors.password = "Passordet må inneholde minst 8 tegn.";
  } else if (!/(?=.*[a-zA-Z]).*$/.test(values.password)) {
    errors.password = "Passordet må inneholde minst 1 bokstav (A-Z eller a-z).";
  } else if (!/(?=.*\d)/.test(values.password)) {
    errors.password = "Passordet må inneholde minst 1 tall.";
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passordene matcher ikke.";
  }

  return errors;
};

const SignupForm = () => {
  const { handleSignup, loggedIn } = useContext(LoginContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      handleSignup(values.username, values.password);
    },
  });

  return (
    <>
      <h4>Opprett bruker</h4>
      {!loggedIn ? (
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Brukernavn
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder="Brukernavn"
                name="username"
                id="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && formik.errors.username}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Passord
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Passord"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Bekreft passord
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Bekreft passord"
                name="confirmPassword"
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Registrer bruker</Button>
            </Col>
          </Form.Group>
        </Form>
      ) : (
        <p>Du kan ikke opprette en ny bruker når du allerede er logget inn.</p>
      )}
    </>
  );
};

export default SignupForm;
