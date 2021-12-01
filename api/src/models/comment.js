const connection = require('../config/database');

module.exports.getComments = async (postid, callback) => {
    var getCommentsQuery = `SELECT comment.id AS commentid, users.id, users.name, users.picurl, comment.date, comment.editdate, comment.content FROM comment INNER JOIN users ON comment.user_id = users.id WHERE comment.post_id = $1 ORDER BY comment.date DESC`;
    //var getCommentsQuery = `SELECT * FROM comments WHERE comment.post_id = $1`
    connection.query(getCommentsQuery, [postid])
    .then(results => {
        callback(results.rows, null)
    })
    .catch(err => {
        console.log("eror valled here")
        console.log(err)
        callback(null, err)
    })
}



module.exports.getById = async (id, callback) => {
    const getCommentByIdQuery = `SELECT comment.id AS commentid, users.id, users.name, users.picurl, comment.date, comment.editdate, comment.content FROM comment INNER JOIN users ON comment.user_id = users.id WHERE comment.id =  $1`;
    connection.query(getCommentByIdQuery, [id])
    .then(results => {
        console.log("called")
        console.log(results.rows)
        callback(results.rows, null)
    })
    .catch(err => {
        console.log(err)
        callback(null, err)
    })
}

module.exports.update = async (userid, commentid, newComment, callback) => {
    var updateCommentQuery = `update comment set content = $1, editdate = now() where user_id = $2 AND id = $3`
    connection.query(updateCommentQuery, [newComment, userid, commentid])
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