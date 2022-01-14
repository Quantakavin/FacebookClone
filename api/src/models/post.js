const connection = require('../config/database');
const config = require('../config/config');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: config.cloudinaryname,
    api_key: config.cloudinarykey,
    api_secret: config.cloudinarysecret
});

module.exports.insertText = async (userid, content, callback) => {
    const insertPostQuery = `INSERT INTO post (type, user_id, content, date) VALUES ($1, $2, $3, NOW() at time zone 'SGT') RETURNING id;`;
    connection.query(insertPostQuery, ["text", userid, content])
        .then(returnid => {
            callback(returnid, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.updateText = async (postid, content, callback) => {
    const updatePostQuery = `UPDATE post SET content=$1, editdate=NOW() at time zone 'SGT' WHERE id=$2;`;
    connection.query(updatePostQuery, [content, postid])
        .then(returnid => {
            callback(returnid, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}


module.exports.uploadFile = async (file, callback) => {
    cloudinary.uploader.upload(file.path, { upload_preset: 'image_upload' , quality : "auto"})
        .then((result) => {
            //let data = { imageURL: result.url, publicId: result.public_id, status: 'success' };
            callback(result, null);
        }).catch((error) => {
            console.log(error)
            callback(null, error);
        });

}

module.exports.uploadVideo = async (file, callback) => {
    cloudinary.uploader.upload(file.path, {resource_type: "video",  chunk_size: 5000000, upload_preset: 'image_upload' })
        .then((result) => {
            //let data = { imageURL: result.url, publicId: result.public_id, status: 'success' };
            callback(result, null);
        }).catch((error) => {
            console.log(error)
            callback(null, error);
        });

}

module.exports.insertImage = async (userid, caption, cloudinaryurl, cloudinaryid, callback) => {
    const insertPostQuery = `INSERT INTO post (type, user_id, caption, cloudinaryurl, cloudinaryid, date) VALUES ($1, $2, $3, $4, $5, NOW() at time zone 'SGT') RETURNING id;`;
    connection.query(insertPostQuery, ["image", userid, caption, cloudinaryurl, cloudinaryid])
        .then(returnid => {
            callback(returnid, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.updateImage = async (postid, caption, cloudinaryurl, cloudinaryid, callback) => {
    const updatePostQuery = `UPDATE post SET caption=$1, editdate=NOW() at time zone 'SGT',cloudinaryurl=$2,cloudinaryid=$3 WHERE id=$4;`;
    connection.query(updatePostQuery, [caption, cloudinaryurl, cloudinaryid, postid])
        .then(returnid => {
            callback(returnid, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.insertVideo = async (userid, caption, cloudinaryurl, cloudinaryid, callback) => {
    const insertPostQuery = `INSERT INTO post (type, user_id, caption, cloudinaryurl, cloudinaryid, date) VALUES ($1, $2, $3, $4, $5, NOW() at time zone 'SGT') RETURNING id;`;
    connection.query(insertPostQuery, ["video", userid, caption, cloudinaryurl, cloudinaryid])
        .then(returnid => {
            callback(returnid, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.updateVideo = async (postid, caption, cloudinaryurl, cloudinaryid, callback) => {
    const updatePostQuery = `UPDATE post SET caption=$1, editdate=NOW() at time zone 'SGT',cloudinaryurl=$2,cloudinaryid=$3 WHERE id=$4;`;
    connection.query(updatePostQuery, [caption, cloudinaryurl, cloudinaryid, postid])
        .then(returnid => {
            callback(returnid, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.feed = async (userid, callback) => {
    let followids = [userid]
    const followQuery = "SELECT * FROM friendship WHERE user_id =$1 OR friend_id = $1";
    connection.query(followQuery, [userid])
        .then(result => {
            for (let i = 0; i < result.rows.length; i++) {
                if (result.rows[i].user_id != userid) {
                    followids.push(result.rows[i].user_id)
                }
                if (result.rows[i].friend_id != userid) {
                    followids.push(result.rows[i].friend_id)
                }
            }
            console.log(followids)
            const feedQuery = `SELECT post.id AS postid, users.id, users.name, users.picurl, post.date, post.editdate, post.content, post.type, post.caption, post.cloudinaryurl FROM post INNER JOIN users ON post.user_id = users.id WHERE users.id = ANY ($1) ORDER BY post.date DESC`;
            connection.query(feedQuery, [followids])
                .then(results2 => {
                    callback(results2.rows, null)
                })
                .catch(error => {
                    console.log(error)
                    callback(null, error)
                })
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.getById = async (id, callback) => {
    const getPostByIdQuery = `SELECT post.id AS postid, users.id, users.name, users.picurl, post.date, post.editdate, post.content, post.type, post.caption, post.cloudinaryurl FROM post INNER JOIN users ON post.user_id = users.id WHERE post.id =  $1`;
    connection.query(getPostByIdQuery, [id])
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

module.exports.getByUserId = async (userid, callback) => {
    const getPostByUserIdQuery = `SELECT post.id AS postid, users.id, users.name, users.picurl, post.date, post.editdate, post.content, post.type, post.caption, post.cloudinaryurl FROM post INNER JOIN users ON post.user_id = users.id WHERE post.user_id =  $1 ORDER BY post.date DESC`;
    connection.query(getPostByUserIdQuery, [userid])
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
module.exports.delete =  async (id,callback) => {
    const deletePostQuery = `DELETE FROM post Where id = $1`;
    connection.query(deletePostQuery, [id])
    .then(returnid => {
        callback(returnid, null)
    })
    .catch(err => {
        console.log(err)
        callback(null, err)
    })
} 