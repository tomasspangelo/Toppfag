import React, { useState, useEffect } from "react";

import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useFetch from "./useFetch";

import EmneAccordion from "./EmneAccordion";
import SearchMenu from "./SearchMenu";

const Search = () => {
  const [query, setQuery] = useState("");
  const [currentUrl, setCurrentUrl] = useState(
    `https://grades.no/api/v2/courses/?limit=20&offset=0&query=${query}`
  );
  const [numPages, setNumPages] = useState(20);

  const [semester, setSemester] = useState("Begge");

  // const [query, setQuery] = useState("");
  const { results, isLoading, message, nextUrl, previousUrl } = useFetch(
    query,
    currentUrl
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (semester === "Begge") {
        setCurrentUrl(
          `https://grades.no/api/v2/courses/?limit=${numPages}&offset=0&query=${query}`
        );
      }
      if (semester === "Vår") {
        setCurrentUrl(
          `https://grades.no/api/v2/courses/?limit=${numPages}&offset=0&query=${query}&taught_in_spring=true`
        );
      }
      if (semester === "Høst") {
        setCurrentUrl(
          `https://grades.no/api/v2/courses/?limit=${numPages}&offset=0&query=${query}&taught_in_autumn=true`
        );
      }
    }

    return () => (mounted = false);
  }, [query, numPages, semester]);
  return (
    <>
      <Container fluid>
        <br />
        <Row>
          <Col>
            <h1 style={{ textAlign: "center" }}>Emner</h1>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="auto">
            <SearchMenu
              setQuery={setQuery}
              numPages={numPages}
              setNumPages={setNumPages}
              semester={semester}
              setSemester={setSemester}
            ></SearchMenu>
          </Col>
          <Col>
            {/* Loading bar */}
            {isLoading && <Spinner animation="border" variant="info" />}
            {/*Error Message*/}
            {message && <p className="message">{message} :(</p>}
            {
              <Accordion>
                {results.map((subject) => {
                  const { id } = subject;
                  return <EmneAccordion key={id} {...subject}></EmneAccordion>;
                })}
              </Accordion>
            }
            <br />
            {!isLoading && (
              <>
                <Button
                  variant="info"
                  onClick={() => {
                    setCurrentUrl(previousUrl.current);
                  }}
                >
                  Forrige
                </Button>
                <Button
                  variant="info"
                  onClick={() => {
                    setCurrentUrl(nextUrl.current);
                  }}
                >
                  Neste
                </Button>
              </>
            )}
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Search;
