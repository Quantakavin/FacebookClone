const like = require('../models/likes');


module.exports.like = async (req, res) => {
    try {
        let { userid, postid } = req.body;
        await like.like(userid, postid, (results, error) => {      //calling of model method(function) for like 
            if (error) {
                res.status(500).json({ message: "Internal Server Error!" });
            } else {
                return res.status(201).send(results);
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.unlike = async (req, res) => {
    try {
        let {userid} = req.body;
        let postid = req.params.id
        await like.unlike(userid, postid, (results, error) => {      //calling of model method(function) for deleting the likes
            if (error) {
                res.status(500).json({ message: "Internal Server Error!" });
            } else {
                return res.status(204).send(results);
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.checklike = async (req, res) => {
    try {
        let {userid} = req.body;
        let postid = req.params.id
        await like.check(userid, postid, (results, error) => {      //calling of model method(function) for deleting the likes
            if (error) {
                res.status(500).json({ message: "Internal Server Error!" });
            } else {
                return res.status(200).send(results.rows[0]);
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}




module.exports.getLikesInfo = async (req, res) => {
    //get all posts from friends
    //get like count for each post
    //get like status for those the user has liked. 
    try {
        let postid = req.params.id;
        await like.getInfo(postid, (results, error) => {
            if (error) {
                res.status(500).json({ message: "Internal Server Error!" });
            } else {
                console.log(results)
                return res.status(200).send(results);
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}