const notification = require('../models/notification')

module.exports.commentNotification = async (req, res) => {
  const {receiver_id, notification_id, userid, postid} = req.body
  console.log(req.body);
  try {
    console.log(userid);
      const results = await notification.commentNotification(receiver_id, notification_id, userid, postid)
      return res.status(201).send(results.rows)
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error!' })
  }
}

module.exports.friendNotification = async (req, res) => {
  const {receiver_id, notification_id, userid} = req.body
  console.log(req.body);
  try {
    console.log(userid);
      const results = await notification.friendNotification(receiver_id, notification_id, userid)
      return res.status(201).send(results.rows)
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error!' })
  }
}

module.exports.getNotifications = async (req, res) => {
  const {userid} = req.query;
  try {
      const results = await notification.getNotifications(userid)
      return res.status(201).send(results.rows)
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error!' })
  }
}

