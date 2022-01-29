import React, { useState, useEffect } from 'react';
import TopBar from '../Components/TopBar';
import axios from 'axios';
import config from '../config/config';
import { Container } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const Notifications = () => {
    const [notification, setNotification] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getNotification()
    })

    const getNotification = () => {
        axios.get(`${config.baseURL}/notification?receiver_id=${localStorage.getItem("user_id")}`, {
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
                <TopBar/>
            </header>
            <div id="wrapper">
                <div id="info">
                    <h2 style={{ marginTop: 50, marginBottom: 30 }}>Notifications</h2>
                    {notification.map(notifications =>
                        <div>
                            <span onClick={() => { history.push(`./profile/${notifications.userid}`) }} > {notifications.name}</span>
                            <span onClick={() => { history.push(`./post/${notifications.postid}`) }}> {notifications.notification_message}</span>
                        </div>
                    )}

                </div>

            </div >
        </>
    )
}

export default Notifications