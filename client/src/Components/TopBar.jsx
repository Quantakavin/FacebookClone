import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import facebookicon from '../Images/facebookicon.png';
import '../Styles/nav.scss';
import { useHistory } from "react-router-dom";
import Search from "./Search.jsx"
import axios from 'axios';
import config from '../config/config';

const TopBar = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [unreadmessage, setUnreadmessage] = useState([])
  const [unreadmessageLoading, setUnreadmessageLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const logout = () => {
    localStorage.clear();
    history.push('/')
  }
  
  const getRequests = () => {
    axios
      .get(`${config.baseURL}/getFriendship`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('promise fulfilled')
        setUsers(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error);
      })

  }

  const getUnreadMessages = () => {
    axios
      .get(`${config.baseURL}/unreadmessagescount`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('promise fulfilled')
        setUnreadmessage(response.data)
        setUnreadmessageLoading(false)
      })
      .catch(error => {
        console.log(error);
        setUnreadmessageLoading(false)
      })

  }


  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      getRequests()
      getUnreadMessages()
    }
  }, [])
  if (localStorage.getItem("token") == null) {
    return (
      <>
        <Navbar variant="dark" expand="lg" fixed="top" style={{ backgroundColor: "#4267B2" }}>
          <Container fluid>
            <Navbar.Brand className="brand" href="/"><img
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

        <Navbar variant="dark" expand="lg" fixed="top" style={{ backgroundColor: "#4267B2"} }>
          <Container fluid>
            <Navbar.Brand className="brand" href="/userhome"><img
              alt=""
              src={facebookicon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            />{' '}Facebook</Navbar.Brand>
            <Search/>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0 navlinks"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link style={{ color: "white" }} href="/notifications">Notifications</Nav.Link>
                <div className={"iconSection"}>
                <Nav.Link style={{ color: "white" }} href="/requests">Requests</Nav.Link>
                {users.length != 0?
                <span className={"iconBadge"}>{users.length}</span> :""
                }
                </div>
    
                <Nav.Link style={{ color: "white" }} href="/users">Friends</Nav.Link>
                <div className={"iconSection"}>
                <Nav.Link style={{ color: "white" }} href="/conversations">Messages</Nav.Link>
                {unreadmessage.length != 0? <>{unreadmessage[0].count > 0 ? <span className={"iconBadge"}>{unreadmessage[0].count}</span> : <></>}</>
                 :""
                }
                </div>
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