const conversation = require('../models/conversation');

module.exports.newConversation = async (req, res) => {
    let {sender, receiver} = req.query;
    try {
        let results = await conversation.insert(sender, receiver)
        if (results) {
            return res.status(201).send(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}


module.exports.getConversations = async (req, res) => {
    let {userid} = req.params;
    try {
        let results = await conversation.getAll(userid)
        if (results) {
            return res.status(200).send(results)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}