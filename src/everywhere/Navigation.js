import React, { useContext } from "react";

import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import LoginModal from "../user/LoginModal";
import { LoginContext } from "../App";

const Navigation = () => {
  const { loggedIn, handleLogout, username } = useContext(LoginContext);

  return (
    <Navbar bg="info" variant="dark" sticky="top" expand="lg">
      <Navbar.Brand as={Link} to="/">
        ToppFag
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" variant="outline-info">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Hjem
          </Nav.Link>
          <Nav.Link as={Link} to="/emner">
            Emner
          </Nav.Link>
          {/* <NavDropdown title="Dropdown" variant="outline-info">
            <NavDropdown.Item as={Link} to="/">
              Action
            </NavDropdown.Item>
            <NavDropdown.Item href="/">Another action</NavDropdown.Item>
            <NavDropdown.Item href="/">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        {loggedIn || (
          <>
            <LoginModal></LoginModal>
            <Button
              variant="light"
              style={{ marginLeft: "0.5rem" }}
              as={Link}
              to="/registrer-deg"
            >
              Registrer deg
            </Button>
          </>
        )}
        {!loggedIn || (
          <>
            <Navbar.Brand>Hei, {username}</Navbar.Brand>
            <Button
              variant="light"
              style={{ marginLeft: "0.5rem" }}
              onClick={handleLogout}
            >
              Logg ut
            </Button>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
