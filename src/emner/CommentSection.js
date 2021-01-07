import React, { useState, useEffect } from "react";
import EmneComment from "./EmneComment";
import Container from "react-bootstrap/Container";
import CommentForm from "./CommentForm";
import { Accordion, Card } from "react-bootstrap";

const CommentSection = ({ courseCode }) => {
  const [comments, setComments] = useState([]);
  const url = `/api/comments/courses/${courseCode}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setComments(json));
  }, [url]);

  return (
    <>
      <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Vurder faget
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <CommentForm
                  course_code={courseCode}
                  comments={comments}
                  setComments={setComments}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <p>
          {comments.length > 0 || "Ingen anmeldelser enda, bli den første!"}
        </p>
        {comments.map((comment) => {
          return <EmneComment key={comment.id} {...comment}></EmneComment>;
        })}
      </Container>
    </>
  );
};

export default CommentSection;
