const like = require('../models/likes');

module.exports.like = async (req, res) => {
    let { userid, postid } = req.body;
    try {
        let results =  await like.like(userid, postid)
        if (results) {
            return res.status(201).send(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.unlike = async (req, res) => {
    let {userid} = req.body;
    let postid = req.params.id;
    try {
        let results = await like.unlike(userid, postid)
        if (results) {
            return res.status(204).send(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.checklike = async (req, res) => {
    let {userid} = req.body;
    let postid = req.params.id
    try {
        let results = await like.check(userid, postid)
        if (results) {
            return res.status(200).send(results.rows[0]);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.getLikesInfo = async (req, res) => {
    let postid = req.params.id;
    try {
        results = await like.getInfo(postid)
        if (results) {
            return res.status(200).send(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}