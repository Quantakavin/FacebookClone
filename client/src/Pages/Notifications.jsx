import React, { useState, useEffect } from 'react';
import TopBar from '../Components/TopBar';
import axios from 'axios';
import config from '../config/config';
import { Container } from 'react-bootstrap';


const Notifications = (props) => {
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        getNotification()
    })


    const getNotification = () => {
        axios.get(`${config.baseURL}/notification?receiver_id=${localStorage.getItem("user_id")}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
              }
          })
          .then(response => {
            setNotification(response.data)
          })
          .catch(error => {
            console.log(error);
            
          })
    
      }
      

    return (
        <>
        <header>
            <TopBar />
        </header>
        <div id="wrapper">
            <div id="info">
                <h2 style={{marginTop: 50, marginBottom: 30}}>Notifications</h2>
                {notification.map(notifications=>
                            <div>
                               <p>{notifications.name} {notifications.notification_message}</p> 
                            </div>
                    )}
                 
            </div>
            
        </div >
        </>
    )
}

export default Notifications