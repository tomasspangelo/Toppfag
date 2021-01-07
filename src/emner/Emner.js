import React from "react";

import Search from "./Search";

const Emner = () => {
  return (
    <>
      {/* <Container fluid>
        <Row>
          <Col>
            <br></br>
            <h1 style={{ textAlign: "center" }}>Emner</h1>
          </Col>
        </Row>
        <Row>
          <Col lg="auto">
            <SideMenu></SideMenu>
          </Col>
          <Col>
            <Search />
          </Col>
        </Row>
      </Container> */}
      <Search></Search>
    </>
  );
};

export default Emner;
