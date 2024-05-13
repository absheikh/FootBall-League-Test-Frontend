import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarContainer = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      data-bs-theme="light"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="/">Football League</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/teams">Teams</Nav.Link>
            <Nav.Link href="/players">Players</Nav.Link>
            <Nav.Link href="/fixtures">Fixtures</Nav.Link>
            <Nav.Link href="/standings">Standings</Nav.Link>
            <Nav.Link href="/results">Results</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarContainer;
