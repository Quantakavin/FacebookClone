const connection = require('../config/database')


module.exports.Notification = async (sender_id, receiver_id, notification_id) => {
  const insertNotificationQuery = `INSERT into Notification (Sender_ID, Receiver_ID, notification_ID) VALUES ($1, $2, $3)`
  return new Promise((resolve, reject) => {
      connection
          .query(insertNotificationQuery, [sender_id, receiver_id, notification_id])
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
