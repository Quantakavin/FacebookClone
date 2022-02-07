const connection = require('../config/database')

module.exports.getComments = async (postid) => {
    const getCommentsQuery = `SELECT comment.id AS commentid, users.id, users.name, users.picurl, comment.date, comment.editdate, comment.content FROM comment INNER JOIN users ON comment.user_id = users.id WHERE comment.post_id = $1 ORDER BY comment.date DESC`
    return connection.query(getCommentsQuery, [postid])
}

module.exports.getById = async (id) => {
    const getCommentByIdQuery = `SELECT comment.id AS commentid, users.id, users.name, users.picurl, comment.date, comment.editdate, comment.content FROM comment INNER JOIN users ON comment.user_id = users.id WHERE comment.id =  $1`
    return connection.query(getCommentByIdQuery, [id])
}

module.exports.update = async (userid, commentid, newComment) => {
    const updateCommentQuery = `update comment set content = $1, editdate = now() where user_id = $2 AND id = $3`
    return connection.query(updateCommentQuery, [newComment, userid, commentid])
}

module.exports.createComment = async (userid, postid, commentText) => {
    const makeComment = `insert into comment (user_id, post_id, content, date) values ( $1, $2, $3, now() )`
    return connection.query(makeComment, [userid, postid, commentText])
}

module.exports.deleteComment = async (commentid) => {
    const deleteComment = `Delete From comment where id = $1`
    return connection.query(deleteComment, [commentid])
}
