const config = require('../config/config');
const user = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var validator = require('validator');
var post = require('../models/post')
const sgMail = require('@sendgrid/mail');
const { sendgridkey } = require('../config/config');
sgMail.setApiKey(config.sendgridkey)

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    try {
        let results = await user.login(email)
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
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.registerUser = async (req, res) => {
    let { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal Server Error!" });
            }
            else {
                try {
                    let results = await user.insert(name, email, hash)
                    const msg = {
                        from: 'spfacebookclone@gmail.com',
                        template_id: config.sendgridwelcome ,
                         personalizations: [{
                            to: email,
                            dynamic_template_data: {
                                "firstName": name
                            },
                        }]  ,
                        
                      };
                    sgMail
                    .send(msg)
                    .then(() => {
                        console.log('Confirmation Email Sent')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    let data = {
                        id: results.rows[0].id,
                        name: name,
                        token: jwt.sign({ id: results.rows[0].id }, config.JWTKey, {
                            expiresIn: 86400
                        })
                    };
                    return res.status(201).send(data);
                } catch (issue) {
                    if (issue.code == "23505") {
                        return res.status(422).json({ message: "User with that email already exists" });
                    } else {
                        console.log(issue)
                        res.status(500).json({ message: "Internal Server Error!" });
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.retrieveUserById = async (req, res) => {
    var gottenID = req.params.gottenID
    try {
        //var getterID = req.body.getterID 
        //no need yet
        let results = await user.getUserByID(gottenID)
        if (results) {
            return res.status(201).send(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(404).send("Cannot find user with that id");
    }

}

module.exports.updateUser = (req, res) => {
    const { newName, newBio, userid } = req.body
    try {
        let results = user.updateNonSensitiveData(userid, newName, newBio)
        if (results) {
            return res.status(200).send(results)
        }
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
        try {
            let results = user.updatePassword(userid, newPassword)
            if (results) {
                return res.status(200).send(results);
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error });
        }
    } else {
        return res.status(400).json({ message: "password not good enough" });
    }
}

module.exports.allUsers = async (req, res) => {
    var userid = req.body.userid;
    try {
        let results = await user.getAll(userid)
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.updatePFP = async (req, res) => {
    var userid = req.body.userid;
    var pfp = req.body.file
    try {
        let result = await post.uploadFile(pfp)
        let cloudinaryurl = result.url;
        let cloudinaryid = result.public_id
        try {
            let updateRecordSuccess = await user.updatePFP(userid, cloudinaryurl, cloudinaryid)
            if (updateRecordSuccess) {
                return res.status(204).json({ message: "Post Updated!" });
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Error with file record updating" });
        }

        await post.uploadFile(pfp, async function (result, posterror) {
            if (posterror) {
                console.log(posterror)
                res.status(500).json({ message: "Error with file submission" });
            } else {
                let cloudinaryurl = result.url;
                let cloudinaryid = result.public_id
                try {
                    user.updatePFP(userid, cloudinaryurl, cloudinaryid, (updateRecordSuccess, updateRecordFail) => {
                        if (updateRecordFail) {
                            console.log(updateRecordFail)
                            res.status(500).json({ message: "Error with file record updating" });
                        } else {
                            return res.status(204).json({ message: "Post Updated!" });
                        }
                    })
                } catch (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error with file record updating line 178" });
                }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error with file submission" });
    }
}


module.exports.privacyStatus = async (req,res) => {
    var userid = req.body.userid;
    try {
        let results = await user.getPrivacy(userid)
        if (results) {
            return res.status(200).json(results);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

