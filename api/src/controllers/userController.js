const config = require('../config/config');
const user = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.loginUser = async (req,res) => {
    let {email, password} = req.body; 
    try {
        await user.login(email, function(error, results) {
            if (error) {
                console.log(error);
                return res.status(500).json({message: "Internal Server Error!"});

            } else {
                console.log(results)
                    if (results.rows[0] == null) {
                        return res.status(500).json({ message: "User with email doesn't exist" });
                    }
                    if (bcrypt.compareSync(password, results.rows[0].password) == true) {

                        let data = {
                            id: results.rows[0].id,
                            name: results.rows[0].name,
                            token: jwt.sign({ id: results.rows[0].id}, config.JWTKey, {
                                expiresIn: 86400 
                            })
                        };

                        return res.status(200).json(data);
                    } else {
                        //return res.status(500).json({ message: error });
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
                return res.status(500).json({message: "Internal Server Error!"});
            }
            else {
                await user.insert(name, email, hash, (results, issue) => {
                    if (issue) {
                        if (issue.code=="23505") {
                            //res.status(422).send(issue);
                            return res.status(422).json({message: "User with that email already exists"});
                        } else {
                            console.log(issue)
                            //res.status(500).send(issue);
                            res.status(500).json({message: "Internal Server Error!"});
                        }
                    } else {
                        return res.status(201).send(results);
                    }
                })
            }
        })
    } catch (error) {
        console.log("Error with registration")
        //return res.status(500).send(error);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

module.exports.retrieveUserById = async (req, res) => {
    try {
        //var getterID = req.body.getterID 
        //no need yet
        var gottenID = req.body.gottenID
        await user.getUserByID( gottenID, (results, issue) => {
            if (issue) {
                console.log(issue)
                return res.status(404).send("lol fuck you")
            } else {
                return res.status(201).send(results);
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }

}

module.exports.updateUser = (req, res) => {
    try{
        
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }

}
