const conversation = require('../models/conversation')

module.exports.newConversation = async (req, res) => {
    const { sender, receiver } = req.query
    try {
        const results = await conversation.insert(sender, receiver)
        return res.status(201).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getConversations = async (req, res) => {
    const { userid } = req.params
    try {
        const results = await conversation.getAll(userid)
        return res.status(200).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}
