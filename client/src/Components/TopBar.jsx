import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import facebookicon from '../Images/facebookicon.png';
import '../Styles/nav.scss';
import { useHistory } from "react-router-dom";
import Search from "./SearchBar.jsx"
//import profilephoto from '../Images/profilephoto.png';

const TopBar = () => {
  const history = useHistory();

  const data = [
    { name: "Hello" },
    { name: "adsf" },
    { name: "Heasdfllo" },
    { name: "asdffsadf" },
    { name: "Hk;kello" },
  ]

  const logout = () => {
    localStorage.clear();
    history.push('/')
  }
  if (localStorage.getItem("token") == null) {
    return (
      <>
        <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#4267B2" }}>
          <Container fluid>
            <Navbar.Brand className="brand" href="/home"><img
              alt=""
              src={facebookicon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            />{' '}Facebook</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0 navitems"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link style={{ color: "white" }} href="/login">Login</Nav.Link>
                <Nav.Link style={{ color: "white" }} href="/register">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


      </>
    )
  } else {
    return (
      <>

        <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#4267B2" }}>
          <Container fluid>
            <Navbar.Brand className="brand" href="/userhome"><img
              alt=""
              src={facebookicon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            />{' '}Facebook</Navbar.Brand>
            <Form className="d-flex searchform">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button style={{ backgroundColor: "white", border: "solid 1px #28a745", color: "#28a745" }}>Search</Button>
            </Form>
            <Search placeholder={"Search"} data={data} />
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0 navlinks"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link style={{ color: "white" }} href="/requests">Requests</Nav.Link>
                <Nav.Link style={{ color: "white" }} href="/users">Friends</Nav.Link>
                <Nav.Link style={{ color: "white" }} href="/conversations">Messages</Nav.Link>
                <NavDropdown style={{ color: "white", textTransform: "capitalize" }} title={localStorage.getItem("username")} id="navbarScrollingDropdown">
                  <NavDropdown.Item
                    onClick={() => {
                      if (localStorage.getItem("user_id") != null) {
                        history.push(`/profile/${localStorage.getItem("user_id")}`)
                      }
                    }}

                  >Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


      </>
    )

  }
}
export default TopBar;