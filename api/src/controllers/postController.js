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

module.exports.createVideo = async (req,res) => {
    
}

