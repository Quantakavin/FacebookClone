import React from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const NotificationDropDown = ({ notifications, setNotificationState }) => {

    console.log(notifications)
    const history = useHistory();
    const onClose = () => {
        setNotificationState(false);
    }
    return (
        <div style={{height: "500px", overflowY: "scroll"}}>
            <motion.button whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="save-button"
                  style={{
                    backgroundColor: "#4267B2",
                    color: "black",
                    width: "auto",
                    marginBottom: 10,
                    marginTop: 5,
                    border: "1px solid black",
                    backgroundColor: "white",
                    borderRadius: 5,
                    fontWeight: 500,
                  }} onClick={onClose}>Close</motion.button>
            <h2 style={{ marginTop: 18, marginBottom: 10, backgroundColor: 'white', border: "1px solid black"  }}>Notifications</h2>
            {notifications.map(n => {
                return (
                    <div style={{backgroundColor: 'white', border: "1px solid black", height: 50}}>
                        {
                            n.notification_id === 1 ?
                                <>
                                    <span onClick={() => { history.push(`./profile/${n.userid}`) }} style={{ fontWeight: 'bold' }}> {n.name}</span>
                                    <span onClick={() => { history.push(`./requests/`) }}>{n.notification_message}</span>
                                </>
                                :
                                <>
                                    <span onClick={() => { history.push(`./profile/${n.userid}`) }} style={{ fontWeight: 'bold' }}> {n.name}</span>
                                    <span onClick={() => { history.push(`./post/${n.postid}`) }}>{n.notification_message}</span>
                                </>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default NotificationDropDown;