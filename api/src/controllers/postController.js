const post = require('../models/post');

module.exports.createText = async (req, res) => {
    let {userid, content} = req.body;
    try {
        let results = await post.insertText(userid, content)
        if (results) {
            return res.status(201).send(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

module.exports.updateText = async (req, res) => {
    let postid = req.params.id;
    let {userid, content} = req.body;
    try {
        let results = await post.getById(postid)
        if (results[0].id == userid) {
            try {
                let results2 = post.updateText(postid, content)
                if (results2) {
                    return res.status(204).json({message: "Post Updated!"});
                }
            } catch (err) {
                return res.status(500).json({message: "Internal Server Error!"});
            } 
        } else {
            return res.status(402).json({"message":"You do not have access"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Cannot find post"});
    }
}

module.exports.createPhoto = async (req,res) => {
    let {userid, caption, file} = req.body;
    try {

        let result = await post.uploadFile(file)
        let cloudinaryurl = result.url;
        let cloudinaryid = result.public_id

        try {
            let returnresults = await post.insertImage(userid, caption, cloudinaryurl, cloudinaryid)
            if (returnresults) {
                res.status(201).send(returnresults);
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Error with file submission" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}
module.exports.updatePhoto = async (req,res) => {
    let postid = req.params.id;
    let {userid, caption, file} = req.body;
    try {
        let results = await post.getById(postid)
        if (results[0].id == userid) {
            try {
                let result = post.uploadFile(file)
                let cloudinaryurl = result.url;
                let cloudinaryid = result.public_id
                try {
                    let returnresults = await post.updateImage(postid, caption, cloudinaryurl, cloudinaryid)
                    if (returnresults) {
                        return res.status(204).json({message: "Post Updated!"});
                    }
                } catch (err) {
                    console.log(err)
                    return res.status(500).json({ message: "Error with file submission" });
                }

            } catch (posterror) {
                console.log(posterror)
                return res.status(500).json({ message: "Error with file submission" });
            }
        } else {
            return res.status(402).json({"message":"You do not have access"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Cannot find post"});
    }
}

module.exports.createVideo = async (req,res) => {
    let {userid, caption, file} = req.body;
    try {

        let result = await post.uploadVideo(file)
        let cloudinaryurl = result.url;
        let cloudinaryid = result.public_id

        try {
            let returnresults = await post.insertVideo(userid, caption, cloudinaryurl, cloudinaryid)
            if (returnresults) {
                res.status(201).send(returnresults);
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Error with file submission" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

module.exports.updateVideo = async (req,res) => {
    let postid = req.params.id;
    let {userid, caption, file} = req.body;
    try {
        let results = await post.getById(postid)
        if (results[0].id == userid) {
            try {
                let result = post.uploadVideo(file)
                let cloudinaryurl = result.url;
                let cloudinaryid = result.public_id
                try {
                    let returnresults = await post.updateVideo(postid, caption, cloudinaryurl, cloudinaryid)
                    if (returnresults) {
                        return res.status(204).json({message: "Post Updated!"});
                    }
                } catch (err) {
                    console.log(err)
                    return res.status(500).json({ message: "Error with file submission" });
                }

            } catch (posterror) {
                console.log(posterror)
                return res.status(500).json({ message: "Error with file submission" });
            }
        } else {
            return res.status(402).json({"message":"You do not have access"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Cannot find post"});
    }
}

module.exports.getFeed = async (req,res) => {
    var userid = req.body.userid;
    try {
        let results = await post.feed(userid)
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

module.exports.getPosts = async (req,res) => {
    var userid = req.params.userid;
    try {
        let results = await post.getByUserId(userid)
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Cannot find post"});
    }
}

module.exports.getPost = async (req,res) => {
    let id = req.params.id;
    try {
        let results = await post.getById(id)
        if (results) {
            return res.status(200).json(results[0]);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Cannot find post"});
    }
}
module.exports.deletePost = async (req,res) => {
    let id = req.params.id;
    let userid = req.body.userid;
    try {

        let results = await post.getById(id)

        if (results[0].id == userid) {
            try {
                let results2 = await post.delete(id)
                if (results2) {
                    return res.status(204).json({"message":"Post deleted successfully"});
                }
            } catch (err) {
                console.log(err)
                return res.status(500).json({"error": "Cannot find post"});
            }
        } else {
            return res.status(402).json({"message":"You do not have access"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Cannot find post"});
    }
}


