const message = require('../models/message')
const conversation = require('../models/conversation')

module.exports.newMessage = async (req, res) => {
    const conversationid = req.params.conversationid
    const { userid, content } = req.body
    try {

        const results = await conversation.get(conversationid, userid) 
        if (results.rows.length == 0) {
            return res.status(402).json({ message: 'You do not have access' })
        } else {
            const results2 = await message.insert(userid, conversationid, content)
             return res.status(201).send(results)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getMessages = async (req, res) => { 
    const conversationid = req.params.id
    const { userid } = req.body
    try {
        const results = await conversation.get(conversationid, userid) 
        if (results.rows.length == 0) {
            return res.status(402).json({ message: 'You do not have access' })
        } else {
            const results2 = await message.getAll(conversationid, userid)
            return res.status(200).send(results2)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.updateRead = async (req, res) => { 
    const conversationid = req.params.id
    const { userid } = req.body
    try {
        const results = await conversation.get(conversationid, userid) 
        if (results.rows.length == 0) {
            return res.status(402).json({ message: 'You do not have access' })
        } else {
            const results2 = await message.updateRead(conversationid, userid)
            return res.status(201).send(results2)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getUnread = async (req, res) => { 
    const { userid } = req.body
    try {
        const results = await message.getUnread(userid)
        return res.status(200).send(results.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}
