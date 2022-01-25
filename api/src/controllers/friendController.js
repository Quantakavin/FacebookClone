const friendship = require('../models/friendship')

module.exports.friend = async (req, res) => {
    const status = 'requested'
    const { userid, friendid } = req.body
    try {
        const results = await friendship.insert(userid, friendid, status)
        return res.status(201).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.unfriend = async (req, res) => {
    const { userid } = req.body
    const friendid = req.query.id
    try {
        const results = await friendship.delete(userid, friendid)
        return res.status(204).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.checkFriendship = async (req, res) => {
  try {
    let { userid, friendid } = req.body;
    await friendship.get(userid, friendid, (results, error) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error!" });
      } else {
        return res.status(201).send(results.rows);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.getRequests = async (req, res) => {
  const friend_id = req.body.userid;
  try {
    const results = await friendship.getRequests(friend_id)
    return res.status(201).send(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};


