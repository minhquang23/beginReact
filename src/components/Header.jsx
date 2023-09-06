import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/img/logo512.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout succeed!");
  };
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
            <i className="fa-solid fa-gear"></i>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <div className="login">
                <NavLink to="/login" className={"nav-link"}>
                  Login
                </NavLink>
              </div>
              <div className="logout">
                <NavLink
                  to="/login"
                  className={"nav-link"}
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
