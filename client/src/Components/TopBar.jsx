import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';
import facebookicon from '../Images/facebookicon.png';

const TopBar = () => {
  if(localStorage.getItem("token")==null) {
    return(
        <>
  <Navbar  variant="dark" style={{backgroundColor: "#4267B2"}}>
    <Container>
    <Navbar.Brand style={{fontWeight: '500'}} href="/home"><img
          alt=""
          src={facebookicon}
          width="30"
          height="30"
          className="d-inline-block align-top"
          style={{marginRight: 10}}
        />{' '}Facebook</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </Nav>
    </Container>
  </Navbar>


</>
    )
  } else {
    return(
      <>

<Navbar variant="dark" expand="lg" style={{backgroundColor: "#4267B2"}}>
  <Container fluid>
    <Navbar.Brand style={{fontWeight: '500'}} href="/userhome"><img
        alt=""
        src={facebookicon}
        width="30"
        height="30"
        className="d-inline-block align-top"
        style={{marginRight: 10}}
      />{' '}Facebook</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/users">Users</Nav.Link>
        <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#" disabled>
          Link
        </Nav.Link>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>


</>
  )

  }
}
export default TopBar;