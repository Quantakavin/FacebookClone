import React from "react";
import { useHistory } from "react-router-dom";

const NotificationDropDown = ({ notifications, setNotificationState }) => {

    console.log(notifications)
    const history = useHistory();
    const onClose = () => {
        setNotificationState(false);
    }
    return (
        <div>
            <button onClick={onClose}>Close</button>
            <h2 style={{ marginTop: 50, marginBottom: 30 }}>Notifications</h2>
            {notifications.map(n => {
                return (
                    <div>
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