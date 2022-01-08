const search = require('../models/search');

module.exports.searchUser = async (req, res) => {
    try {
        let {username} = req.body;
        await search.search(username, (results, error) => {
            if (error) {
                console.log(error);
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