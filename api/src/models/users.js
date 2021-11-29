var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/database');

var validator = require('validator');

module.exports.insert = async (name, email, password, callback) => {

    const insertUserQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`;
    const values = [name, email, password];
    connection.query(insertUserQuery, values)
        .then(returnid => {
            callback(returnid, null)
        })
        .catch(err => callback(null, err))
}


module.exports.login = async (email, callback) => {
    const loginUserQuery = `SELECT id, name, password FROM users WHERE email=$1`;
    connection.query(loginUserQuery, [email])
        .then(results => {
            callback(null, results);
        })
        .catch(err => callback(err, null))
}


module.exports.getUserByID = async (gottenID, callback) => {

    const sql = "SELECT * FROM users where id = $1 "
    // const privacy = getterID == gottenID ? ";" : "AND privacy = true;"
    connection.query(sql, [gottenID])
        .then(result => {
            console.log(result.rows[0])
            callback(result.rows[0], null)
        })
        .catch(err => callback(null, err))

}

module.exports.updateNonSensitiveData = (userid, newName, newBio, callback) => {
    const updateProfile = "Update users set name = $1, bio = $2 where id = $3 returning name AS newName, bio AS newBio"
    connection.query(updateProfile, [newName, newBio, userid])
        .then(result => {
            console.log(result.rows[0], "in users.js")
            callback(result.rows[0], null)
        })
        .catch((err) => { 
            console.log("users.js line 52")
            console.log(err)
            callback(null, err)
        })

}

module.exports.updatePassword = (userid, newPwd, callback) => {
    const getOldData = "SELECT password FROM users where id = $1"
    var oldPwd = "";
    connection.query(getOldData, [userid])
        .then(result => {
            console.log(result.rows[0].password, "line 52")
            oldPwd = result.rows[0].password
            if (bcrypt.compareSync(newPwd, oldPwd) == true) {
                return callback(null, "new password cant be same as old password")
            } else {
                console.log("new pwd is " + newPwd)
                bcrypt.hash(newPwd, 10, (err, newHashedPwd) => {
                    if (err) {
                        console.log(err);
                        //return res.status(500).send(err);
                        return res.status(500).json({ message: "Internal Server Error!" });
                    } else {
                        const updatePassword = "update users set password = $1 where id = $2 returning id"
                        connection.query(updatePassword, [newHashedPwd, userid])
                            .then(result => {
                                console.log(result)
                                callback(result, null)
                            }).catch(err => callback(null, err))
                    }
                })
            }
        })
        .catch(err => callback(null, err))


}

module.exports.updatePFP = (userid, cloudinaryurl, cloudinaryid, callback) => {
    const updatePFP = "update users set picurl = $1, picid = $2 where id = $3"
    connection.query(updatePFP, [cloudinaryurl, cloudinaryid, userid])
        .then(result => {
            console.log("in users.js update pfp" + result.data)
            callback(result, null)
        })
        .catch(err => callback(null, err))
}

module.exports.updateCoverPic = () => {

}
/*
module.exports.getAll = (userid, callback) => {
    const sql = "SELECT * FROM users where id != $1 "
    connection.query(sql , [userid])
    .then(results => {
        callback(results.rows, null)
    })
    .catch(err => callback(null, err))
}

*/
module.exports.getAll = async (userid, callback) => {
    const sql = "SELECT * FROM users where id != $1 "
    // const privacy = getterID == gottenID ? ";" : "AND privacy = true;"
    connection.query(sql, [userid])
        .then(result => {
            let counter = 0;

            for (let i = 0; i < result.rows.length; i++) {
                let sql2 = "SELECT * FROM friendship WHERE (user_id = $1 AND friend_id=$2) OR (user_id = $2 AND friend_id=$1)"

                connection.query(sql2, [userid, result.rows[i].id])
                    .then(result2 => {
                        counter++;
                        if (result2.rows.length == 0) {
                            result.rows[i].friended = false;
                        } else {
                            result.rows[i].friended = true;
                        }
                        if (counter == (result.rows.length)) {
                            callback(result.rows, null)
                        }
                    }
                    )
                    .catch(error => {
                        console.log(error)
                        callback(null, error)
                    })
            }
        })
}
