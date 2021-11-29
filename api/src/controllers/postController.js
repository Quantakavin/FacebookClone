const post = require('../models/post');

module.exports.createText = async (req, res) => {
    try {
        let {userid, content} = req.body;
        await post.insertText(userid, content, (results, error) => {
            if (error) {
                res.status(500).json({message: "Internal Server Error!"});
            } else {
                return res.status(201).send(results);
            }
        })  
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

module.exports.updateText = async (req, res) => {
    try {
        let postid = req.params.id;
        let {userid, content} = req.body;
        await post.updateText(postid, content, (results, error) => {
            if (error) {
                res.status(500).json({message: "Internal Server Error!"});
            } else {
                return res.status(204).json({message: "Post Updated!"});
            }
        })  
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

module.exports.createPhoto = async (req,res) => {
    let {userid, caption, file} = req.body;
    try {
        await post.uploadFile(file, async function(result, posterror) {
            if(posterror) {
                console.log(posterror)
                res.status(500).json({ message: "Error with file submission" });
            } else {
                let cloudinaryurl = result.url;
                let cloudinaryid = result.public_id
                try {
                    await post.insertImage(userid, caption, cloudinaryurl, cloudinaryid, (returnresults, issue) => {
                        if (issue) {
                            console.log(issue)
                            res.status(500).json({ message: "Error with file submission" });
                        } else {
                            res.status(201).send(returnresults);
                        }
                    })
                } catch (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error with file submission" });
                }
            }
        }) 

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}
module.exports.updatePhoto = async (req,res) => {
    let postid = req.params.id;
    let {userid, caption, file} = req.body;
    try {
        await post.uploadFile(file, async function(result, posterror) {
            if(posterror) {
                console.log(posterror)
                res.status(500).json({ message: "Error with file submission" });
            } else {
                let cloudinaryurl = result.url;
                let cloudinaryid = result.public_id
                try {
                    await post.updateImage(postid, caption, cloudinaryurl, cloudinaryid, (returnresults, issue) => {
                        if (issue) {
                            console.log(issue)
                            res.status(500).json({ message: "Error with file submission" });
                        } else {
                            return res.status(204).json({message: "Post Updated!"});
                        }
                    })
                } catch (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error with file submission" });
                }
            }
        }) 

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

module.exports.createVideo = async (req,res) => {
    
}

module.exports.getFeed = async (req,res) => {
    try {
        var userid = req.body.userid;
        await post.feed(userid, (results, err) => {
            if(err) {
                return res.status(500).json({message: "Cannot retrieve posts"});
            } else {
                return res.status(200).json(results);
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

module.exports.getPosts = async (req,res) => {
    var userid = req.body.userid;
    try {
        await post.getByUserId(userid, (results, error) => {
            if(error) {
                console.log(error)
                return res.status(500).json({error: "Cannot find post"});
            } else {
                return res.status(200).json(results);
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Cannot find post"});
    }
}

module.exports.getPost = async (req,res) => {
    let id = req.params.id;
    try {
        await post.getById(id, (results, error) => {
            if(error) {
                console.log(error)
                return res.status(500).json({error: "Cannot find post"});
            } else {
                return res.status(200).json(results[0]);
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Cannot find post"});
    }
}
module.exports.deletePost = async (req,res) => {
    let id = req.params.id;
    try {
        await post.delete(id, (results, error) => {
            if(error) {
                console.log(error)
                return res.status(500).json({error: "Cannot find post"});
            } else {
                return res.status(204).json({message:"Post deleted successfully"});
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Cannot find post"});
    }
}


