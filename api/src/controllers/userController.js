const config = require('../config/config');
const user = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;



}

module.exports.registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                console.log("Hashing error");
                return res.status(500).send(err);
            }
            else {
                await user.insert(name, email, hash, (results, issue) => {
                    if (issue) {
                        if (issue.code == "ER_DUP_ENTRY") {
                            res.status(422).send(issue);
                        } else {
                            console.log(issue)
                            res.status(500).send(issue);
                        }
                    } else {
                        return res.status(201).send(results);
                    }
                })
            }
        })
    } catch (error) {
        console.log("Error with registration")
        return res.status(500).send(error);
    }

}

module.exports.retrieveUserById = async (req, res) => {
    try {
        var getterID = req.body.getterID;
        var gottenID = req.body.gottenID;
        await user.getProfile(getterID, gottenID, (results, issue) => {
            if (issue) {
                console.log(issue)
                res.status(500).send(issue);
            } else {
                return res.status(201).send(results);
            }
        })
    } catch (error) {
        console.log("Error with getting account")
        return res.status(500).send(error);
    }

}

module.exports.updateUser = (req, res) => {


}