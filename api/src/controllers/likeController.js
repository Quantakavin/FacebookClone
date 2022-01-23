const like = require('../models/likes')

module.exports.like = async (req, res) => {
    const { userid, postid } = req.body
    try {
        const results = await like.like(userid, postid)
        return res.status(201).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.unlike = async (req, res) => {
    const { userid } = req.body
    const postid = req.params.id
    try {
        const results = await like.unlike(userid, postid)
        return res.status(204).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.checklike = async (req, res) => {
    const { userid } = req.body
    const postid = req.params.id
    try {
        const results = await like.check(userid, postid)
        return res.status(200).send(results.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getLikesInfo = async (req, res) => {
    const postid = req.params.id
    try {
        const results = await like.getInfo(postid)
        return res.status(200).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}
