const notification = require('../models/notification')

module.exports.commentNotification = async (req, res) => {
  const {receiver_id, notification_id, userid, postid} = req.body
  try {
    console.log(userid);
      const results = await notification.commentNotification(receiver_id, notification_id, userid, postid)
      return res.status(201).send(results.rows)
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error!' })
  }
}

module.exports.getNotifications = async (req, res) => {
  const {receiver_id} = req.body
  try {
    console.log(receiver_id);
      const results = await notification.getNotifications(receiver_id)
      return res.status(201).send(results.rows)
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error!' })
  }
}

