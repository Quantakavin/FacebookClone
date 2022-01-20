const message = require('../models/message')

module.exports.newMessage = async (req, res) => {
    const { sender, receiver, content } = req.body
    try {
        const results = await message.insert(sender, receiver, content)
        return res.status(201).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getMessages = async (req, res) => {
    const { sender, receiver } = req.query
    try {
        const results = await message.getAll(sender, receiver)
        return res.status(200).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}
