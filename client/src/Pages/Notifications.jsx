import React, { useState, useEffect } from 'react';
import TopBar from '../Components/TopBar';
import axios from 'axios';
import config from '../config/config';


const Notifications = (props) => {
    const [notification, setNotification] = useState('');

    const getNotification = () => {
        axios
          .get(`${config.baseURL}/notification`)
          .then(response => {
            setNotification(response.data.rows)
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
            </div>
            
        </div >
        </>
    )
}

export default Notifications