import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const EmneComment = (props) => {
  const {
    grade,
    would_take_again,
    difficulty,
    quality,
    content,
    author_username,
    created_at,
  } = props;

  const date = new Date(created_at);

  return (
    <Card style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <Card.Header>{author_username}</Card.Header>
      <Card.Body>
        <Row>
          <Col sm="auto">
            Ville tatt igjen: <b>{would_take_again}</b>
          </Col>
          <Col sm="auto">
            Karakter: <b>{grade}</b>
          </Col>{" "}
          <Col sm="auto">
            Kvalitet: <b>{quality}</b>
          </Col>
          <Col sm="auto">
            Vanskelighetsgrad: <b>{difficulty}</b>
          </Col>
        </Row>
        <Card.Text style={{ marginTop: "2rem" }}>{content}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{date.toLocaleString()}</Card.Footer>
    </Card>
  );
};

export default EmneComment;
