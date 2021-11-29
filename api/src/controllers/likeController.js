const like = require('../models/likes');


module.exports.like = async (req, res) => {
    try {
        let {userid, postid} = req.body;
        await like.insert(userid, postid, (results, error) => {      //calling of model method(function) for like 
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

module.exports.unlike = async (req, res) => {
    try {
        let {userid, postid} = req.body;
        await like.delete(userid, postid, (results, error) => {      //calling of model method(function) for deleting the likes
            if (error) {
                res.status(500).json({message: "Internal Server Error!"});
            } else {
                return res.status(204).send(results);
            }
        })  
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}