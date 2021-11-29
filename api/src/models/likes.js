// post id 
// user id

const connection = require('../config/database');

module.exports.like = async (userid, postid, callback) => {
    const insertlikequery = `INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING id;`;
    connection.query(insertlikequery, [userid, postid])
        .then(returnid => {

            callback(returnid, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.unlike = async (userid, postid, callback) => {
    const deletelikequery = `DELETE FROM likes WHERE( user_id = $1 AND post_id = $2)`;   //Method to unlike 
    connection.query(deletelikequery, [userid, postid])
        .then(returnid => {

            callback(returnid, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

