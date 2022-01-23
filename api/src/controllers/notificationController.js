const notification = require('../models/notification')

module.exports.sendNotification = async (req, res) => {
  const {sender_id, receiver_id, notification_id } = req.body
  try {
      const results = await notification.Notification(sender_id, receiver_id, notification_id)
      return res.status(201).send(results.rows)
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error!' })
  }
}

