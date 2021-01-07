import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import BarChart from "./GradeStats";
import CommentSection from "./CommentSection";

const Emne = () => {
  const { courseCode } = useParams();
  const [data, setdata] = useState([]);
  const url = `https://grades.no/api/v2/courses/${courseCode}`;
  useEffect(() => {
    // getSubjects();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((newData) => setdata(newData));
  }, [url]);

  return (
    <Container>
      <br />
      <h2>
        {courseCode} - {data.norwegian_name}
      </h2>
      <Tabs>
        <Tab eventKey="emnet" title="Om emnet">
          <article style={{ padding: "1rem" }}>
            <p> {data.content}</p>

            <h4>Læringsmål</h4>
            <p>{data.learning_goal}</p>
          </article>

          <Card style={{ margin: "1rem", width: "20rem" }}>
            <Card.Header>Fakta om emnet</Card.Header>
            <Card.Body>
              <Card.Text as="div">
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  <li>Studiepoeng: {data.credit}</li>
                  <li>SP Studienivå: {data.course_level}</li>
                  <li>Læringsform: {data.learning_form}</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="statistikk" title="Statistikk">
          <BarChart data={data} courseCode={courseCode}></BarChart>
        </Tab>
      </Tabs>
      <Tabs>
        <Tab eventKey="anmeldelser" title="Anmeldelser">
          <CommentSection courseCode={courseCode}></CommentSection>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Emne;
