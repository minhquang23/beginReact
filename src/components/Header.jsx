import "../assets/css/components.scss";
import logoApp from "../assets/img/logo512.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = (props) => {
  const navigate = useNavigate();
  const { logoutContext, user } = useContext(UserContext);

  const handleLogout = () => {
    logoutContext();
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
          {(user?.auth === true || window.location.pathname === "/") && (
            <>
              <Nav className="me-auto">
                <NavLink to={"/"} className={"nav-link"}>
                  Home
                </NavLink>
                {user?.auth && (
                  <NavLink to={"/users"} className={"nav-link"}>
                    Manage Users
                  </NavLink>
                )}
              </Nav>
              <Nav
                className="setting"
                style={{ display: "flex", alignItems: "center" }}
              >
                {user?.email && (
                  <span className="dropdown-item">Welcome {user.email}</span>
                )}
                <i className="fa-solid fa-gear"></i>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user?.auth ? (
                    <div className="logout">
                      <NavLink
                        to="/login"
                        className={"nav-link"}
                        onClick={handleLogout}
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                      </NavLink>
                    </div>
                  ) : (
                    <div className="login">
                      <NavLink to="/login" className={"nav-link"}>
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Login
                      </NavLink>
                    </div>
                  )}
                </NavDropdown>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
