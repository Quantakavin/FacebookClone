const friendship = require("../models/friendship");

module.exports.friend = async (req, res) => {
  try {
    let status = "requested";
    let { userid, friendid } = req.body;
    await friendship.insert(userid, friendid, status, (results, error) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error!" });
      } else {
        return res.status(201).send(results);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.unfriend = async (req, res) => {
  try {
    let userid = req.body.userid;
    let friendid = req.query.id;
    await friendship.delete(userid, friendid, (results, error) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error!" });
      } else {
        return res.status(204).send(results);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

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
  try {
    let { userid } = req.body;
    await friendship.get(userid, (results, error) => {
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


