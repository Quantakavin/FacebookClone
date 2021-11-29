const connection = require('../config/database');

module.exports.getComments = async (callback) => {

}

module.exports.update = async (userid, commentID, newComment, callback) => {
    var updateCommentQuery = `update comment set content = $1, editdate = now() where user_id = $2 AND id = $3`
    connection.query(updateCommentQuery, [newComment, userid, commentID])
        .then(result => {
            console.log(result)
            if (result.rowCount == 0) {
                return callback(null, "update failed. either commentID or userid was wrong")
            }
            callback(result, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.createComment = async (userid, postid, commentText,callback) => {
    var makeComment = `insert into comment (user_id, post_id, content, date) values ( $1, $2, $3, now() )`
    connection.query(makeComment, [userid, postid, commentText,])
        .then(result => {
            console.log(result)
            callback(result, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.deleteComment = async (commentid,callback) => {
    var deleteComment = `Delete From comment where id = $1`
    connection.query(deleteComment, [commentid])
        .then(result => {
            console.log(result)
            callback(result, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })

}