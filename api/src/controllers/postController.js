const post = require('../models/post')

module.exports.createText = async (req, res) => {
    const { userid, content } = req.body
    try {
        const results = await post.insertText(userid, content)
        return res.status(201).send(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.updateText = async (req, res) => {
    const postid = req.params.id
    const { userid, content } = req.body
    try {
        const results = await post.getById(postid)
        if (results[0].id === userid) {
            try {
                await post.updateText(postid, content)
                return res.status(204).json({ message: 'Post Updated!' })
            } catch (err) {
                return res
                    .status(500)
                    .json({ message: 'Internal Server Error!' })
            }
        } else {
            return res.status(402).json({ message: 'You do not have access' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Cannot find post' })
    }
}

module.exports.createPhoto = async (req, res) => {
    const { userid, caption, file } = req.body
    try {
        const result = await post.uploadFile(file)
        const cloudinaryurl = result.url
        const cloudinaryid = result.public_id

        try {
            const returnresults = await post.insertImage(
                userid,
                caption,
                cloudinaryurl,
                cloudinaryid
            )
            return res.status(201).send(returnresults)
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({ message: 'Error with file submission' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}
module.exports.updatePhoto = async (req, res) => {
    const postid = req.params.id
    const { userid, caption, file } = req.body
    try {
        const results = await post.getById(postid)
        if (results[0].id === userid) {
            try {
                const result = await post.uploadFile(file)
                const cloudinaryurl = result.url
                const cloudinaryid = result.public_id
                try {
                    await post.updateImage(
                        postid,
                        caption,
                        cloudinaryurl,
                        cloudinaryid
                    )
                    return res.status(204).json({ message: 'Post Updated!' })
                } catch (err) {
                    console.log(err)
                    return res
                        .status(500)
                        .json({ message: 'Error with file submission' })
                }
            } catch (posterror) {
                console.log(posterror)
                return res
                    .status(500)
                    .json({ message: 'Error with file submission' })
            }
        } else {
            return res.status(402).json({ message: 'You do not have access' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Cannot find post' })
    }
}

module.exports.createVideo = async (req, res) => {
    const { userid, caption, file } = req.body
    try {
        const result = await post.uploadVideo(file)
        const cloudinaryurl = result.url
        const cloudinaryid = result.public_id

        try {
            const returnresults = await post.insertVideo(
                userid,
                caption,
                cloudinaryurl,
                cloudinaryid
            )
            return res.status(201).send(returnresults)
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({ message: 'Error with file submission' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.updateVideo = async (req, res) => {
    const postid = req.params.id
    const { userid, caption, file } = req.body
    try {
        const results = await post.getById(postid)
        if (results[0].id === userid) {
            try {
                const result = await post.uploadVideo(file)
                const cloudinaryurl = result.url
                const cloudinaryid = result.public_id
                try {
                    await post.updateVideo(
                        postid,
                        caption,
                        cloudinaryurl,
                        cloudinaryid
                    )
                    return res.status(204).json({ message: 'Post Updated!' })
                } catch (err) {
                    console.log(err)
                    return res
                        .status(500)
                        .json({ message: 'Error with file submission' })
                }
            } catch (posterror) {
                console.log(posterror)
                return res
                    .status(500)
                    .json({ message: 'Error with file submission' })
            }
        } else {
            return res.status(402).json({ message: 'You do not have access' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Cannot find post' })
    }
}

module.exports.getFeed = async (req, res) => {
    const { userid } = req.body
    try {
        const results = await post.feed(userid)
        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getPosts = async (req, res) => {
    const { userid } = req.params
    try {
        const results = await post.getByUserId(userid)
        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Cannot find post' })
    }
}

module.exports.getPost = async (req, res) => {
    const { id } = req.params
    try {
        const results = await post.getById(id)
        return res.status(200).json(results[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Cannot find post' })
    }
}
module.exports.deletePost = async (req, res) => {
    const { id } = req.params
    const { userid } = req.body
    try {
        const results = await post.getById(id)

        if (results[0].id === userid) {
            try {
                await post.delete(id)
                return res
                    .status(204)
                    .json({ message: 'Post deleted successfully' })
            } catch (err) {
                console.log(err)
                return res.status(500).json({ error: 'Cannot find post' })
            }
        } else {
            return res.status(402).json({ message: 'You do not have access' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Cannot find post' })
    }
}
