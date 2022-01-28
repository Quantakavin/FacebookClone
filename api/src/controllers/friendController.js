const friendship = require('../models/friendship')

module.exports.friend = async (req, res) => {
    const status = "requested"
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
  console.log("checkFriendship is working") 
  try {
    let { userid, friendid } = req.query;
    console.log(req.body)
    const results = await friendship.getFriendship(userid, friendid )
    console.log(results);
    return res.status(201).send(results);
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

module.exports.acceptRequests = async (req, res) => {
  const status = "accepted";
  const confirmed = true;
  const friend_id = req.body.userid; //user id is used to show which person sent the request
  const user_id = req.body.friendid;
  try {
    const results = await friendship.acceptRequests(status, confirmed, friend_id, user_id)
    return res.status(201).send(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.declineRequests = async (req, res) => {
  const status = "declined";
  const confirmed = false;
  const friend_id = req.body.userid; //user id is used to show which person sent the request
  const user_id = req.body.friendid;
  try {
    const results = await friendship.declineRequests(status, confirmed, friend_id, user_id)
    return res.status(201).send(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.getMutualFriends = async (req, res) => {
  let { user_id, friend_id } = req.query;
  try {
    const results = await friendship.getMutualFriends(user_id, friend_id);
    return res.status(201).send(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};