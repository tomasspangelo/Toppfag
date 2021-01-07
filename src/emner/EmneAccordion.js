import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

const EmneAccordion = (props) => {
  const { code, norwegian_name, content } = props;
  return (
    <>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={code}>
          {code} {norwegian_name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={code}>
          <Card.Body>
            <Card.Title>{norwegian_name}</Card.Title>
            <Card.Text as="p" style={{ whiteSpace: "pre-line" }}>
              {content || "Beskrivelse ikke tilgjengelig."}
            </Card.Text>
            <Button variant="info" as={Link} to={`/emner/${code}`}>
              Se mer
            </Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
};

export default EmneAccordion;
