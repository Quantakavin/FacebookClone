const connection = require('../config/database')


module.exports.commentNotification = async (receiver_id, notification_id, postid, userid) => {
    let jsondata = {"postid": postid, "userid": userid};
    const insertNotificationQuery = `INSERT into Notification (Receiver_ID, notification_ID, Time, Data) VALUES ($1, $2, NOW() at time zone 'SGT', $3)`
    return new Promise((resolve, reject) => {
        connection
            .query(insertNotificationQuery, [receiver_id, notification_id, jsondata])
            .then((returnid) => {
                resolve(returnid)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.getNotifications = async (receiver_id) => {
    const sql = `SELECT * FROM notification n, notificationmessage nm, post p WHERE (n.receiver_id = $1 AND nm.id = n.notification_id AND (CAST((n.data ->> 'postid') AS INTEGER) = p.id))`
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [receiver_id])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

