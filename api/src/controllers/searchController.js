const search = require('../models/search')

module.exports.searchUser = async (req, res) => {
    // let {username} = req.params;
    // console.log("username is " + username)
    try {
        const results = await search.search()
        return res.status(201).send(results.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}
