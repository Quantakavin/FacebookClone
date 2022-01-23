const connection = require('../config/database')

module.exports.getComments = async (postid) => {
    const getCommentsQuery = `SELECT comment.id AS commentid, users.id, users.name, users.picurl, comment.date, comment.editdate, comment.content FROM comment INNER JOIN users ON comment.user_id = users.id WHERE comment.post_id = $1 ORDER BY comment.date DESC`
    return new Promise((resolve, reject) => {
        connection
            .query(getCommentsQuery, [postid])
            .then((results) => {
                resolve(results.rows)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.getById = async (id) => {
    const getCommentByIdQuery = `SELECT comment.id AS commentid, users.id, users.name, users.picurl, comment.date, comment.editdate, comment.content FROM comment INNER JOIN users ON comment.user_id = users.id WHERE comment.id =  $1`
    return new Promise((resolve, reject) => {
        connection
            .query(getCommentByIdQuery, [id])
            .then((results) => {
                resolve(results.rows)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.update = async (userid, commentid, newComment) => {
    const updateCommentQuery = `update comment set content = $1, editdate = now() where user_id = $2 AND id = $3`
    return new Promise((resolve, reject) => {
        connection
            .query(updateCommentQuery, [newComment, userid, commentid])
            .then((result) => {
                if (result.rowCount === 0) {
                    reject(
                        new Error(
                            'update failed. either commentID or userid was wrong'
                        )
                    )
                }
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.createComment = async (userid, postid, commentText) => {
    const makeComment = `insert into comment (user_id, post_id, content, date) values ( $1, $2, $3, now() )`
    return new Promise((resolve, reject) => {
        connection
            .query(makeComment, [userid, postid, commentText])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.deleteComment = async (commentid) => {
    const deleteComment = `Delete From comment where id = $1`
    return new Promise((resolve, reject) => {
        connection
            .query(deleteComment, [commentid])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}
