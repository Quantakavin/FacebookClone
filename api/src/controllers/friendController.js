const friendship = require("../models/friendship"); 

module.exports.friend = async (req, res) => {
  let status = "requested";
  let { userid, friendid } = req.body;
  try {
    let results = await friendship.insert(userid, friendid, status)
    if (results) {
      return res.status(201).send(results);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.unfriend = async (req, res) => {
  let userid = req.body.userid;
  let friendid = req.query.id;
  try {
    let results = await friendship.delete(userid, friendid)
    if (results) {
      return res.status(204).send(results);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.checkFriendship = async (req, res) => {
  let { userid, friendid } = req.body;
  try {
    let results = await friendship.get(userid, friendid)
    if (results) {
      return res.status(201).send(results.rows);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};




