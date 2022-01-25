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

