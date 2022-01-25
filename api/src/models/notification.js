const connection = require('../config/database')

// Comment and likes is the same
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


module.exports.getNotification = async (postid) => {
  const getLikeCount = `SELECT * FROM Notifications where receiver_id = $1`
  return new Promise((resolve, reject) => {
      connection
          .query(getLikeCount, [postid])
          .then((results) => {
              resolve(results)
          })
          .catch((err) => {
              console.log(err)
              reject(err)
          })
  })
}

