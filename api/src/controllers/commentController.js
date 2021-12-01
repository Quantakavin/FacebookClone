const comment = require('../models/comment');

module.exports.getAllComments = async (req, res) => {
    var postid = req.params.id;
    try {
        comment.getComments(postid, (results,err) =>{
            if (err) {
                console.log(err)
                return res.status(500).json({ err });
            } else {

                return res.status(200).json(results)
        
            }
        })
    }catch (error) {
        console.log(error)
        res.status(500).json({ message: "Comments cannot be retrieved" })
    }
}

module.exports.getComment = async (req,res) => { 
    let id = req.params.id;
    try {
        await comment.getById(id, (results, error) => {
            if(error) {
                console.log(error)
                return res.status(500).json({error: "Cannot find comment"});
            } else {
                return res.status(200).json(results[0]);
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Cannot find comment"});
    }
}

module.exports.updateComment = async (req, res) => {
    var id = req.params.id;
    var { userid, content} = req.body
    try {
        comment.update(userid, id, content, (results, err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ err });
            } else {
                return res.status(200).json(results)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "" })
    }
}

module.exports.createComment = async (req, res) => {
    var { userid, postid, content } = req.body
    try {
        comment.createComment(userid, postid, content, (results, err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "Create comment failed in backend" });
            } else {
                return res.status(200).json(results)
            }
        })
    } catch (error) {
        console.log(error)
        res.status().json({ message: "" })
    }
}

module.exports.deleteComment = async (req, res) => {
    var commentid = req.params.id
    try {
        comment.deleteComment(commentid, (results, err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message:"delete comment failed in backend" });
            } else {
                return res.status(204).json(results)
            }
        })

    } catch (error) {
        console.log(error)
        res.status().json({ message: "" })
    }
}