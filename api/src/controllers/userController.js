const config = require('../config/config');
const user = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.loginUser = async (req,res) => {
    let {email, password} = req.body;
    try {
        await user.login(email, (err, results) => {
            if (err) {
                console.log("Login error");
                return res.status(500).send(err);
            }

        })

    } catch (error) {
        console.log("Error with login")
        return res.status(500).send(error);
    }


}

module.exports.registerUser = async(req,res) => {
    try {
        let {name, email, password} = req.body;
        bcrypt.hash(password, 10, async(err, hash) => {
            if (err) {
                console.log("Hashing error");
                return res.status(500).send(err);
            }
            else {
                await user.insert(name, email, hash, (results, issue) => {
                    if (issue) {
                        if (issue.code=="ER_DUP_ENTRY") {
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

module.exports.retrieveUserById = (req,res) => {
    

}

module.exports.updateUser = (req,res) => {
    

}