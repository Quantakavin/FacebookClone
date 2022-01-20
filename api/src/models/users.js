const bcrypt = require('bcrypt')
const connection = require('../config/database')

module.exports.insert = async (name, email, password) => {
    const insertUserQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`
    const values = [name, email, password]
    return new Promise((resolve, reject) => {
        connection
            .query(insertUserQuery, values)
            .then((returnid) => {
                resolve(returnid)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.login = async (email) => {
    const loginUserQuery = `SELECT id, name, password FROM users WHERE email=$1`
    return new Promise((resolve, reject) => {
        connection
            .query(loginUserQuery, [email])
            .then((results) => {
                resolve(results)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.getUserByID = async (gottenID) => {
    const sql = 'SELECT * FROM users where id = $1 '
    // const privacy = getterID == gottenID ? ";" : "AND privacy = true;"
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [gottenID])
            .then((result) => {
                console.log(result.rows[0])
                resolve(result.rows[0])
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.updateNonSensitiveData = (userid, newName, newBio) => {
    const updateProfile =
        'Update users set name = $1, bio = $2 where id = $3 returning name AS newName, bio AS newBio'
    return new Promise((resolve, reject) => {
        connection
            .query(updateProfile, [newName, newBio, userid])
            .then((result) => {
                resolve(result.rows[0])
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.updatePassword = (userid, newPwd) => {
    const getOldData = 'SELECT password FROM users where id = $1'
    let oldPwd = ''
    return new Promise((resolve, reject) => {
        connection
            .query(getOldData, [userid])
            .then((result) => {
                console.log(result.rows[0].password, 'line 52')
                oldPwd = result.rows[0].password
                if (bcrypt.compareSync(newPwd, oldPwd) === true) {
                    reject(
                        new Error('new password cant be same as old password')
                    )
                } else {
                    console.log(`new pwd is ${newPwd}`)
                    bcrypt.hash(newPwd, 10, (err, newHashedPwd) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            const updatePassword =
                                'update users set password = $1 where id = $2 returning id'
                            connection
                                .query(updatePassword, [newHashedPwd, userid])
                                .then((result2) => {
                                    resolve(result2)
                                })
                                .catch((err2) => {
                                    console.log(err2)
                                    reject(err2)
                                })
                        }
                    })
                }
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

module.exports.updatePFP = (userid, cloudinaryurl, cloudinaryid) => {
    const updatePFP = 'update users set picurl = $1, picid = $2 where id = $3'
    return new Promise((resolve, reject) => {
        connection
            .query(updatePFP, [cloudinaryurl, cloudinaryid, userid])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.updateCoverPic = () => {}
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

module.exports.getAll = async (userid) => {
    const sql = 'SELECT * FROM users where id != $1 '
    const sql2 =
        'SELECT * FROM friendship WHERE (user_id = $1 AND friend_id=$2) OR (user_id = $2 AND friend_id=$1)'
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [userid])
            .then((result) => {
                let counter = 0
                for (let i = 0; i < result.rows.length; i += 1) {
                    connection
                        .query(sql2, [userid, result.rows[i].id])
                        .then((result2) => {
                            counter += 1
                            if (result2.rows.length === 0) {
                                result.rows[i].friended = false
                            } else {
                                result.rows[i].friended = true
                            }
                            if (counter === result.rows.length) {
                                resolve(result.rows)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            reject(error)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

/*
module.exports.getAll = async (userid) => {
    const sql = `SELECT u.id, u.name, u.privacy, u.bio, u.picurl, 
    IF(SELECT COUNT(*) FROM friendship WHERE (user_id = $1 AND friend_id=u.id) OR (user_id = u.id AND friend_id=$1) = 0, false, true) AS friended  FROM users u LEFT JOIN friendship f on users.id = friendship.user_id OR users.id = friendship.friend_id WHERE u.id != $1`
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [userid])
            .then((result) => {
                resolve(result.rows)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}
*/

module.exports.getPrivacy = async (userid) => {
    const sql = 'SELECT privacy FROM users where id = $1'
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [userid])
            .then((result) => {
                console.log(result.rows[0])
                resolve(result.rows[0])
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}
