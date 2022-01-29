const message = require('../models/message')

module.exports.newMessage = async (req, res) => {
    const conversationid = req.params.conversationid
    const { userid, content } = req.body
    try {
        const results = await message.insert(userid, conversationid, content)
        return res.status(201).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getMessages = async (req, res) => { 
    const conversationid = req.params.id
    const { userid } = req.body
    try {
        const results = await message.getAll(conversationid, userid)
        console.log(results)
        return res.status(200).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}
