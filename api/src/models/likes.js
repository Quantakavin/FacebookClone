const connection = require('../config/database'); 

module.exports.like = async (userid, postid) => {
    const insertlikequery = `INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`;
    return new Promise((resolve, reject) => {
        connection.query(insertlikequery, [userid, postid])
        .then(returnid => {
            resolve(returnid)
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

module.exports.unlike = async (userid, postid) => {
    const deletelikequery = `DELETE FROM likes WHERE( user_id = $1 AND post_id = $2)`;
    return new Promise((resolve, reject) => {
        connection.query(deletelikequery, [userid, postid])
        .then(returnid => {
            resolve(returnid)
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

module.exports.check = async (userid, postid) => {
    const checklikequery = `SELECT EXISTS (SELECT * FROM likes WHERE user_id=$1 and post_id=$2)`;
    return new Promise((resolve, reject) => {
        connection.query(checklikequery, [userid, postid])
        .then(results => {
            resolve(results)
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    }) 
}

module.exports.getInfo = async (postid) => {
    const getLikeCount = `SELECT * FROM likes where post_id = $1`;
    return new Promise((resolve, reject) => {
        connection.query(getLikeCount, [postid])
        .then(results => {
            resolve(results)
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })
}