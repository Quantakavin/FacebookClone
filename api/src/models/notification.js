const connection = require('../config/database')


module.exports.commentNotification = async (receiver_id, notification_id,userid, postid ) => {
    let jsondata = {"userid": userid, "postid": postid };
    console.log(jsondata)
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

module.exports.friendNotification = async (receiver_id, notification_id, userid) => {
    let jsondata = {"userid": userid};
    console.log(jsondata)
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

// module.exports.getNotifications = async (receiver_id) => {
//     const sql = `SELECT notification.*, users.name, notificationmessage.notification_message FROM notification INNER JOIN users ON users.id::varchar(255) = notification.DATA ->> 'userid' INNER JOIN notificationmessage ON notification.notification_id = notificationmessage.id WHERE (notification.receiver_id = $1)`
//     return new Promise((resolve, reject) => {
//         connection
//             .query(sql, [receiver_id])
//             .then((result) => {
//                 resolve(result)
//             })
//             .catch((err) => {
//                 console.log(err)
//                 reject(err)
//             })
//     })
// }


module.exports.getNotifications = async (receiver_id) => {
    const sql = `
        SELECT 
            notification.*,
            notification.data ->> 'userid' AS userid, 
            users.name, 
            notificationmessage.notification_message 
        FROM 
            notification INNER JOIN users ON users.id = CAST((notification.data ->> 'postid') AS INTEGER) 
            INNER JOIN notificationmessage ON notification.notification_id = notificationmessage.id 
        WHERE (notification.receiver_id = $1) order by time desc`
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

