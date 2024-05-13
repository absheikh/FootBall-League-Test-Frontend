import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";

const DashboardNav = () => {
  const dispatch = useDispatch();
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      data-bs-theme="light"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard/teams">Teams</Nav.Link>
            <Nav.Link href="/dashboard/players">Players</Nav.Link>
            <Nav.Link href="/dashboard/fixtures">Fixtures</Nav.Link>
            <Nav.Link href="/dashboard/standings">Standings</Nav.Link>
            <Nav.Link href="/dashboard/results">Results</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardNav;
