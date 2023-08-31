import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/img/logo512.png";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="logoApp"
            src={logoApp}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Minh's App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={"/"} className={"nav-link"}>
              Home
            </NavLink>
            <NavLink to={"/users"} className={"nav-link"}>
              Manage Users
            </NavLink>
          </Nav>
          <Nav
            className="setting"
            style={{ display: "flex", alignItems: "center" }}
          >
            <i class="fa-solid fa-gear"></i>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
