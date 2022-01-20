const comment = require('../models/comment'); 

module.exports.getAllComments = async (req, res) => {
    var postid = req.params.id;
    try {
        let results = await comment.getComments(postid)
        if (results) {
            return res.status(200).json(results)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Comments cannot be retrieved" })
    }
}

module.exports.getComment = async (req,res) => { 
    let id = req.params.id;
    try {
        let results = await comment.getById(id);
        if (results) {
            return res.status(200).json(results[0])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Cannot find comment"});
    }
}

module.exports.updateComment = async (req, res) => {
    var id = req.params.id;
    var { userid, content} = req.body
    try {
        let results = await comment.getById(id)
        if (results[0].id == userid) {
            try {
                let results2 = await comment.update(userid, id, content)
                return res.status(200).json(results2)
            } catch (err) {
                console.log(err)
                return res.status(500).json({ err });
            }
        } else {
            return res.status(402).json({"message":"You do not have access"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Cannot find comment"});
    }
}

module.exports.createComment = async (req, res) => {
    var { userid, postid, content } = req.body
    try {
        let results = await comment.createComment(userid, postid, content)
        if (results) {
            return res.status(200).json(results)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Create comment failed in backend" })
    }
}

module.exports.deleteComment = async (req, res) => {
    var commentid = req.params.id
    var { userid } = req.body
    try {
        results = await comment.getById(commentid)
        if (results[0].id == userid) {
            try {
                results2 = await comment.deleteComment(commentid)
                if (results2) {
                    return res.status(200).json(results2)
                }
            } catch (err) {
                console.log(err)
                return res.status(500).json({ message:"delete comment failed in backend" });
            }
        } else {
            return res.status(402).json({"message":"You do not have access"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Cannot find comment" })
    }
}