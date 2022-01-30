import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Container, Row, Card, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import TopBar from '../Components/TopBar';
import profilephoto from '../Images/profilephoto.png';
import config from '../config/config';
import { motion } from "framer-motion";
import UserSkeleton from '../skeletons/UserSkeleton';


const Requests = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    getRequests()
  }, [])

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

  const acceptRequests = (id) => {
    axios
      .put(`${config.baseURL}/accept`, { "friendid": id }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('promise fulfilled')
        setRefresh(r => !r)

      })
      .catch(error => {
        console.log(error);
      })

    //Notification for accepting friend request
    axios
      .post(`${config.baseURL}/notification`, { "receiver_id": id, "notification_id": 5 }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })

  }

  const declineRequests = (id) => {
    axios
      .put(`${config.baseURL}/decline`, { "friendid": id }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('promise fulfilled')

      })
      .catch(error => {
        console.log(error);
      })

  }


  const unfriend = (id) => {
    axios
      .delete(`${config.baseURL}/friend/?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('promise fulfilled')
        getRequests();
      })
      .catch(error => {
        console.log(error);
      })

  }

  // const getRequests = (id) => { 
  //   axios
  //   .get(`${config.baseURL}/friendship/`, {
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}` 
  //     }
  //   })
  //   .then(response => {
  //     console.log('promise fulfilled')
  //     getUsers();
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })

  // }

  return (
    <>
      <header>
        <TopBar />
      </header>
      <div style={{ position: "relative", backgroundColor: "#e3e8ee", height: "100vh", overflow: 'auto', paddingTop: 50, paddingBottom: 50 }}>
        <Container>
          <Row>
            <h2 style={{ marginTop: 50, marginBottom: 30 }}>Accept Friend Requests</h2>
          </Row>
          <Row className="flex-row flex-nowrap overflow-auto" style={{ overflow: "hidden" }}>
            {loading?
              <>
                {Array.from(new Array(5)).map((item, index) => <UserSkeleton key={index}/>)}
              </>:
            <>
            {users.map(user =>
              <Card onClick={() => { history.push(`./profile/${user.id}`) }} className="shadow" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '18rem', marginTop: 10, marginBottom: 10, paddingTop: 15, paddingBottom: 15, marginRight: 20, border: "1px solid #d3d3d3", borderRadius: 10 }} key={user.id}>
                {user.picurl == null ? <Image src={profilephoto} roundedCircle width="150px" height="150px" /> : <Image src={user.picurl} roundedCircle width="150px" height="150px" />}
                <Card.Body>
                  <Card.Title style={{ textTransform: "capitalize" }}>{user.name}</Card.Title>
                </Card.Body>

                {user.friended ?
                  <motion.button style={{ width: "auto", marginBottom: 10, marginTop: 5, color: "#4267B2", border: "1px solid #4267B2", backgroundColor: "white", borderRadius: 5, fontWeight: 500 }} onClick={() => unfriend(user.id)}></motion.button> : <>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="save-button" style={{ width: "auto", marginBottom: 10, marginTop: 5, border: "1px solid #4267B2", backgroundColor: "#4267B2", borderRadius: 5, fontWeight: 500,color:'#ffffff' }} onClick={() => acceptRequests(user.id)}>Accept</motion.button>
                    <motion.button style={{ width: "auto", marginBottom: 10, marginTop: 5, border: "1px solid #4267B2", backgroundColor: "#808080", borderRadius: 5, fontWeight: 500,color:'#ffffff' }} onClick={() => declineRequests(user.id)}>Decline</motion.button></>
                }
              </Card>
            )}
            </>
            }
          </Row>
          <Row>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="save-button"
              style={{ width: "auto", marginBottom: 10, marginTop: 50, border: "1px solid #4267B2", backgroundColor: "#6c89c6", borderRadius: 5, fontWeight: 500, color:'#ffffff'}}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/userhome';
              }}>Proceed to Home</motion.button>
          </Row>
        </Container>
      </div>
    </>
  )


}

export default Requests;