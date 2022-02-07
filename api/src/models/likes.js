const connection = require('../config/database')

module.exports.like = async (userid, postid) => {
    const insertlikequery = `INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`
    return connection.query(insertlikequery, [userid, postid])
}

module.exports.unlike = async (userid, postid) => {
    const deletelikequery = `DELETE FROM likes WHERE( user_id = $1 AND post_id = $2)`
    return connection.query(deletelikequery, [userid, postid])
}

module.exports.check = async (userid, postid) => {
    const checklikequery = `SELECT EXISTS (SELECT * FROM likes WHERE user_id=$1 and post_id=$2)`
    return connection.query(checklikequery, [userid, postid])
}

module.exports.getInfo = async (postid) => {
    const getLikeCount = `SELECT * FROM likes where post_id = $1`
    return connection.query(getLikeCount, [postid])
}
