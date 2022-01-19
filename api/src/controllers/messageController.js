const message = require('../models/message');

module.exports.newMessage = async (req, res) => {
    let {sender, receiver, content} = req.body;
    try {
        let results = await message.insert(sender, receiver, content)
        if (results) {
            return res.status(201).send(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}


module.exports.getMessages = async (req, res) => {
    let {sender, receiver} = req.query;
    try {
        let results = await message.getAll(sender, receiver)
        if (results) {
            return res.status(200).send(results)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}