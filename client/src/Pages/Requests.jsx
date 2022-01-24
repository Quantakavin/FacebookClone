import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Container, Row, Card, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import TopBar from '../Components/TopBar';
import profilephoto from '../Images/profilephoto.png';
import config from '../config/config';


const Requests = () => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    useEffect(() => {
      getRequests()
      }, [])

      const getRequests = () => {
        axios
        .get(`${config.baseURL}/friendship`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        })
        .then(response => {
          console.log('promise fulfilled')
          setUsers(response.data)
        })
        .catch(error => {
          console.log(error);
        })
        
      }

      const acceptRequests = () => {
        axios
        .put(`${config.baseURL}/friendship`, {
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

      return(
        <>
        <header>
            <TopBar />
        </header>
          <div style={{position: "relative",backgroundColor: "#e3e8ee", height: "100vh",overflow: 'auto',paddingTop: 50, paddingBottom: 50}}>
              <Container>
                <Row>
                <h2 style={{marginTop: 50, marginBottom: 30}}>Accept Friend Requests</h2>
                </Row>
              <Row className="flex-row flex-nowrap overflow-auto" style={{overflow: "hidden"}}>
              {users.map(user => 
                 <Card className="shadow" style={{ display: 'flex',  justifyContent:'center', alignItems:'center', width: '18rem', marginTop: 10, marginBottom: 10, paddingTop: 15, paddingBottom: 15, marginRight: 20, border: "1px solid #d3d3d3", borderRadius: 10}} key={user.id}>
                     {user.picurl==null ? <Image src={profilephoto}  roundedCircle width="150px" height="150px" /> : <Image src={user.picurl}  roundedCircle width="150px" height="150px"/> }
                     <Card.Body>
                     <Card.Title style={{textTransform: "capitalize"}}>{user.name}</Card.Title>
                     </Card.Body>

                     {user.friended? 
                     <Button  style={{width: "auto", marginBottom: 10, marginTop: 5, color: "#4267B2", border: "1px solid #4267B2", backgroundColor: "white", borderRadius: 5, fontWeight: 500}} onClick={() => unfriend(user.id) }></Button>:
                     <Button  style={{width: "auto", marginBottom: 10, marginTop: 5, border: "1px solid #4267B2", backgroundColor: "#4267B2", borderRadius: 5, fontWeight: 500}} onClick={() => acceptRequests(user.id)}>Accept</Button>
                    }

                 </Card>
               )}
               </Row>
               <Row>
                 <h4 style={{textAlign: "center", marginTop: 50}}><a style={{color: "#4267B2"}} href="/userhome">Proceed to Home</a></h4>
               </Row>
               </Container>
          </div>
          </>
      ) 

    
}

export default Requests;