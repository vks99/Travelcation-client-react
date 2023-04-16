import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useContext } from "react";
import AuthContext, { AuthContextType } from "../context/AuthContext";

const Navigation = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  return (
    <div className="main-nav">
      <Navbar bg="success" variant="dark">
        <Container>
          <Navbar.Brand href="/">    
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/images/Home/travel_logo2.png"
                width="70"
                height="50"
                className="d-inline-block align-top"
                alt="TravelCation logo"
              />
              <Nav.Link href="/" className="text-white pl-3" style={{ fontWeight: "bold" }}>
                TravelCation
              </Nav.Link>
            </div>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {auth.isLoggedIn ? (
              <>
                <Nav.Link href="/Destination">Destination</Nav.Link>
                <Nav.Link href="/Blogs">Blogs</Nav.Link>
                <Nav.Link href="/BlogForm">BlogForm</Nav.Link>
                <Nav.Link href="/History">History</Nav.Link>
                <Nav.Link href="/Contactus">Contactus</Nav.Link>
                <Nav.Link href="/Login" onClick={auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/Signup">Signup</Nav.Link>
                <Nav.Link href="/Login">Login</Nav.Link>
                <Nav.Link href="/Contactus">Contactus</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
