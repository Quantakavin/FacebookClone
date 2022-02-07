const connection = require('../config/database')

module.exports.commentNotification = async (
    receiver_id,
    notification_id,
    userid,
    postid
) => {
    const jsondata = { userid, postid }
    console.log(jsondata)
    const insertNotificationQuery = `INSERT into Notification (Receiver_ID, notification_ID, Time, Data) VALUES ($1, $2, NOW() at time zone 'SGT', $3)`
    return connection.query(insertNotificationQuery, [
        receiver_id,
        notification_id,
        jsondata
    ])
}

module.exports.friendNotification = async (
    receiver_id,
    notification_id,
    userid
) => {
    const jsondata = { userid }
    console.log(jsondata)
    const insertNotificationQuery = `INSERT into Notification (Receiver_ID, notification_ID, Time, Data) VALUES ($1, $2, NOW() at time zone 'SGT', $3)`
    return connection.query(insertNotificationQuery, [
        receiver_id,
        notification_id,
        jsondata
    ])
}

module.exports.getNotifications = async (receiver_id) => {
    const sql = `
        SELECT 
            notification.*,
            notification.data ->> 'userid' AS userid,
            notification.data ->> 'postid' AS postid,
            users.name, 
            notificationmessage.notification_message 
        FROM 
            notification INNER JOIN users ON users.id = CAST((notification.data ->> 'userid') AS INTEGER) 
            INNER JOIN notificationmessage ON notification.notification_id = notificationmessage.id 
        WHERE (notification.receiver_id = $1) order by time desc`
    return connection.query(sql, [receiver_id])
}
