const comment = require('../models/comment')

module.exports.getAllComments = async (req, res) => {
    const postid = req.params.id
    try {
        const results = await comment.getComments(postid)
        return res.status(200).json(results.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Comments cannot be retrieved' })
    }
}

module.exports.getComment = async (req, res) => {
    const { id } = req.params
    try {
        const results = await comment.getById(id)
        return res.status(200).json(results.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Cannot find comment' })
    }
}
module.exports.updateComment = async (req, res) => {
    const { id } = req.params
    const { userid, content } = req.body
    try {
        const results = await comment.getById(id)
        if (results.rowCount === 0) {
            return res.status(500).json({
                message: 'update failed. either commentID or userid was wrong'
            })
        }
        if (results.rows[0].id === userid) {
            try {
                const results2 = await comment.update(userid, id, content)
                return res.status(200).json(results2)
            } catch (err) {
                console.log(err)
                return res.status(500).json({ err })
            }
        } else {
            return res.status(402).json({ message: 'You do not have access' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Cannot find comment' })
    }
}

module.exports.createComment = async (req, res) => {
    const { userid, postid, content } = req.body
    try {
        const results = await comment.createComment(userid, postid, content)
        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ message: 'Create comment failed in backend' })
    }
}

module.exports.deleteComment = async (req, res) => {
    const commentid = req.params.id
    const { userid } = req.body
    try {
        const results = await comment.getById(commentid)
        if (results.rows[0].id === userid) {
            try {
                const results2 = await comment.deleteComment(commentid)
                return res.status(200).json(results2)
            } catch (err) {
                console.log(err)
                return res
                    .status(500)
                    .json({ message: 'delete comment failed in backend' })
            }
        } else {
            console.log(`here lies the problem${commentid}`)
            return res.status(402).json({ message: 'You do not have access' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Cannot find comment' })
    }
}
