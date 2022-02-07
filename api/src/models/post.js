const cloudinary = require('cloudinary').v2
const connection = require('../config/database')
const config = require('../config/config')

cloudinary.config({
    cloud_name: config.cloudinaryname,
    api_key: config.cloudinarykey,
    api_secret: config.cloudinarysecret
})

module.exports.insertText = async (userid, content) => {
    const insertPostQuery = `INSERT INTO post (type, user_id, content, date) VALUES ($1, $2, $3, NOW() at time zone 'SGT') RETURNING id;`
    return connection.query(insertPostQuery, ['text', userid, content])
}

module.exports.updateText = async (postid, content) => {
    const updatePostQuery = `UPDATE post SET content=$1, editdate=NOW() at time zone 'SGT' WHERE id=$2;`
    return connection.query(updatePostQuery, [content, postid])
}

module.exports.uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload(file.path, { upload_preset: 'image_upload', quality: '60' })
            .then((result) => {
                // let data = { imageURL: result.url, publicId: result.public_id, status: 'success' };
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

module.exports.uploadVideo = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload(file.path, {
                resource_type: 'video',
                chunk_size: 5000000,
                upload_preset: 'image_upload'
            })
            .then((result) => {
                // let data = { imageURL: result.url, publicId: result.public_id, status: 'success' };
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

module.exports.insertImage = async (
    userid,
    caption,
    cloudinaryurl,
    cloudinaryid
) => {
    const insertPostQuery = `INSERT INTO post (type, user_id, caption, cloudinaryurl, cloudinaryid, date) VALUES ($1, $2, $3, $4, $5, NOW() at time zone 'SGT') RETURNING id;`
    return connection.query(insertPostQuery, [
        'image',
        userid,
        caption,
        cloudinaryurl,
        cloudinaryid
    ])
}

module.exports.updateImage = async (
    postid,
    caption,
    cloudinaryurl,
    cloudinaryid
) => {
    const updatePostQuery = `UPDATE post SET caption=$1, editdate=NOW() at time zone 'SGT',cloudinaryurl=$2,cloudinaryid=$3 WHERE id=$4;`
    return connection.query(updatePostQuery, [
        caption,
        cloudinaryurl,
        cloudinaryid,
        postid
    ])
}

module.exports.insertVideo = async (
    userid,
    caption,
    cloudinaryurl,
    cloudinaryid
) => {
    const insertPostQuery = `INSERT INTO post (type, user_id, caption, cloudinaryurl, cloudinaryid, date) VALUES ($1, $2, $3, $4, $5, NOW() at time zone 'SGT') RETURNING id;`
    return connection.query(insertPostQuery, [
        'video',
        userid,
        caption,
        cloudinaryurl,
        cloudinaryid
    ])
}

module.exports.updateVideo = async (
    postid,
    caption,
    cloudinaryurl,
    cloudinaryid
) => {
    const updatePostQuery = `UPDATE post SET caption=$1, editdate=NOW() at time zone 'SGT',cloudinaryurl=$2,cloudinaryid=$3 WHERE id=$4;`
    return connection.query(updatePostQuery, [
        caption,
        cloudinaryurl,
        cloudinaryid,
        postid
    ])
}

module.exports.feed = async (userid) => {
    const followids = [userid]
    const followQuery =
        'SELECT * FROM friendship WHERE user_id =$1 OR friend_id = $1'
    return new Promise((resolve, reject) => {
        connection
            .query(followQuery, [userid])
            .then((result) => {
                for (let i = 0; i < result.rows.length; i += 1) {
                    if (result.rows[i].user_id !== userid) {
                        followids.push(result.rows[i].user_id)
                    }
                    if (result.rows[i].friend_id !== userid) {
                        followids.push(result.rows[i].friend_id)
                    }
                }
                console.log(followids)
                const feedQuery = `SELECT post.id AS postid, users.id, users.name, users.picurl, post.date, post.editdate, post.content, post.type, post.caption, post.cloudinaryurl FROM post INNER JOIN users ON post.user_id = users.id WHERE users.id = ANY ($1) ORDER BY post.date DESC`
                connection
                    .query(feedQuery, [followids])
                    .then((results2) => {
                        resolve(results2.rows)
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error)
                    })
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.getById = async (id) => {
    const getPostByIdQuery = `SELECT post.id AS postid, users.id, users.name, users.picurl, post.date, post.editdate, post.content, post.type, post.caption, post.cloudinaryurl FROM post INNER JOIN users ON post.user_id = users.id WHERE post.id =  $1`
    return connection.query(getPostByIdQuery, [id])
}

module.exports.getByUserId = async (userid) => {
    const getPostByUserIdQuery = `SELECT post.id AS postid, users.id, users.name, users.picurl, post.date, post.editdate, post.content, post.type, post.caption, post.cloudinaryurl FROM post INNER JOIN users ON post.user_id = users.id WHERE post.user_id =  $1 ORDER BY post.date DESC`
    return connection.query(getPostByUserIdQuery, [userid])
}
module.exports.delete = async (id) => {
    const deletePostQuery = `DELETE FROM post Where id = $1`
    return connection.query(deletePostQuery, [id])
}
