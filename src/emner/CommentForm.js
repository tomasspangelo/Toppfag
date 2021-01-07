import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LoginContext } from "../App";

const CommentForm = ({ course_code }) => {
  const { loggedIn } = useContext(LoginContext);

  const [grade, setGrade] = useState("A");
  const [would_take_again, setWouldTakeAgain] = useState("Ja");
  const [difficulty, setDifficulty] = useState(1);
  const [quality, setQuality] = useState(1);
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      e.stopPropagation();
    }
    setValidated(true);
    fetch("/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        grade,
        course_code,
        would_take_again,
        difficulty,
        quality,
        content,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.created_at) {
          // Should add some code here to maybe update if comment was succesfully added
        }
      });
  };

  return (
    <>
      {loggedIn || <p>Logg inn for å legge igjen en kommentar!</p>}
      {loggedIn && (
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="grade">
              <Form.Label>Karakter</Form.Label>
              <Form.Control
                as="select"
                defaultValue="A"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="Bestått">Bestått</option>
                <option value="Ikke bestått">Ikke bestått</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="wouldTakeAgain">
              <Form.Label>Ville du tatt faget igjen?</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Ja"
                value={would_take_again}
                onChange={(e) => setWouldTakeAgain(e.target.value)}
              >
                <option value="Ja">Ja</option>
                <option value="Nei">Nei</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="difficulty">
              <Form.Label>Vanskelighetsgrad</Form.Label>
              <Form.Control
                as="select"
                defaultValue={1}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value={1}>{1}</option>
                <option value={2}>{2}</option>
                <option value={3}>{3}</option>
                <option value={4}>{4}</option>
                <option value={5}>{5}</option>
                <option value={6}>{6}</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="quality">
              <Form.Label>Kvalitet</Form.Label>
              <Form.Control
                as="select"
                defaultValue={1}
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option>{1}</option>
                <option>{2}</option>
                <option>{3}</option>
                <option>{4}</option>
                <option>{5}</option>
                <option>{6}</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="content">
              <Form.Label>Anmeldelse</Form.Label>
              <Form.Control
                required
                as="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Du må skrive noe!
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Button type="submit">Legg igjen en anmeldelse</Button>
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </>
  );
};

export default CommentForm;
