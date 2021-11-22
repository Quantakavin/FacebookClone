const config = require('../config/config');
const user = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var validator = require('validator');
var post = require('../models/post')
module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    try {
        await user.login(email, function (error, results) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal Server Error!" });
            } else {
                console.log(results)
                if (results.rows[0] == null) {
                    return res.status(500).json({ message: "User with email doesn't exist" });
                }
                if (bcrypt.compareSync(password, results.rows[0].password) == true) {
                    let data = {
                        id: results.rows[0].id,
                        name: results.rows[0].name,
                        token: jwt.sign({ id: results.rows[0].id }, config.JWTKey, {
                            expiresIn: 86400
                        })
                    };
                    return res.status(200).json(data);
                } else {
                    return res.status(500).json({ message: 'Invalid Email/Password Combination' });
                }
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports.registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                console.log(err);
                //return res.status(500).send(err);
                return res.status(500).json({ message: "Internal Server Error!" });
            }
            else {
                await user.insert(name, email, hash, (results, issue) => {
                    if (issue) {
                        if (issue.code == "23505") {
                            //res.status(422).send(issue);
                            return res.status(422).json({ message: "User with that email already exists" });
                        } else {
                            console.log(issue)
                            //res.status(500).send(issue);
                            res.status(500).json({ message: "Internal Server Error!" });
                        }
                    } else {
                        let data = {
                            id: results.rows[0].id,
                            name: name,
                            token: jwt.sign({ id: results.rows[0].id }, config.JWTKey, {
                                expiresIn: 86400
                            })
                        };
                        return res.status(201).send(data);
                    }
                })
            }
        })
    } catch (error) {
        console.log("Error with registration")
        //return res.status(500).send(error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.retrieveUserById = async (req, res) => {
    try {
        //var getterID = req.body.getterID 
        //no need yet
        var gottenID = req.params.gottenID
        await user.getUserByID(gottenID, (results, issue) => {
            if (issue) {
                console.log("error in backend")
                console.log(issue)
                return res.status(404).send("Cannot find user with that id")
            } else {
                return res.status(201).send(results);
            }
        })
    } catch (error) {
        console.log("error in backend")
        console.log(error)
        return res.status(500).send(error);
    }

}

module.exports.updateUser = (req, res) => {
    try {
        var userid = req.body.userid
        var { newName,  newBio } = req.body
        user.updateNonSensitiveData(userid, newName,  newBio, (results, issue) => {
            if (issue) {
                console.log(issue +" in usercontroller")
                return res.status(404).send("Some data missing")
            } else {
                console.log(results.toString() + " in userController.js")
                return res.status(200).send(results)
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

module.exports.updateUserPassword = async (req, res) => {
    var userid = req.body.userid
    var newPassword = req.body.newPassword
    passswordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$`);
    if (passswordRegex.test(newPassword)) {
        user.updatePassword(userid, newPassword, (results, issue) => {
            if (issue) {
                console.log(issue);
                //return res.status(500).send(err);
                return res.status(500).json({ message: issue });
            } else {
                return res.status(200).send(results);
            }
        })
    } else {
        return res.status(500).json({ message: "password not good enough" });
    }
}

module.exports.allUsers = async (req, res) => {
    try {
        var userid = req.body.userid;
        await user.getAll(userid, (results, err) => {
            if (err) {
                return res.status(500).json({ message: "Cannot retrieve users" });
            } else {
                return res.status(200).json(results);
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.updatePFP = async (req, res) => {
    try {
        var userid = req.body.userid;
        var pfp = req.body.file
        await post.uploadFile(pfp, async function (result, posterror) {
            if (posterror) {
                console.log(posterror)
                res.status(500).json({ message: "Error with file submission" });
            } else {
                let cloudinaryurl = result.url;
                let cloudinaryid = result.public_id
                try {
                    user.updatePFP(userid,cloudinaryurl, cloudinaryid, (updateRecordSuccess, updateRecordFail) => {
                        if (updateRecordFail) {
                            console.log(updateRecordFail)
                            res.status(500).json({ message: "Error with file record updating" });
                        } else {
                            return res.status(204).json({message: "Post Updated!"});
                        }
                    })
                } catch (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error with file record updating" });
                }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}