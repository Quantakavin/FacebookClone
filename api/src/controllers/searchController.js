const search = require('../models/search');

module.exports.searchUser = async (req, res) => {
    //let {username} = req.params;
    //console.log("username is " + username)
    try {
        let results = await search.search()
        if (results) {
            return res.status(201).send(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}