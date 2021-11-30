const comment = require('../models/comment');

module.exports.getAllComments = async (req, res) => {
    var { userid } = req.body
    try {
        comment.getComments(userid, (results,err) =>{
            if (err) {
                console.log(err)
                return res.status(500).json({ err });
            } else {
                return res.status(200).json({ results })
        
            }
        })
    }catch (error) {
        console.log(error)
        res.status(500).json({ message: "comments cannot be retrieved" })
    }
}

module.exports.updateComment = async (req, res) => {
    var { userid, commentID, newComment } = req.body
    try {
        comment.update(userid, commentID, newComment, (results, err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ err });
            } else {
                return res.status(200).json({ results })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "" })
    }
}

module.exports.createComment = async (req, res) => {
    var { userid, postid, commentText } = req.body
    try {
        comment.createComment(userid, postid, commentText, (results, err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "Create comment failed in backend" });
            } else {
                return res.status(200).json({ results })
            }
        })
    } catch (error) {
        console.log(error)
        res.status().json({ message: "" })
    }
}

module.exports.deleteComment = async (req, res) => {
    var { commentid } = req.body
    try {
        comment.deleteComment(commentid, (results, err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message:"delete comment failed in backend" });
            } else {
                return res.status(204).json({ results })
            }
        })

    } catch (error) {
        console.log(error)
        res.status().json({ message: "" })
    }
}