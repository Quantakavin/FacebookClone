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
            console.log(returnid)
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
    cloudinary.uploader.upload(file.path, { upload_preset: 'image_upload', quality: "60" })
        .then((result) => {
            //let data = { imageURL: result.url, publicId: result.public_id, status: 'success' };
            callback(result, null);
        }).catch((error) => {
            console.log(error)
            callback(null, error);
        });

}

module.exports.uploadVideo = async (file, callback) => {
    cloudinary.uploader.upload(file.path, { resource_type: "video", chunk_size: 5000000, upload_preset: 'image_upload' })
        .then((result) => {
            //let data = { imageURL: result.url, publicId: result.public_id, status: 'success' };
            callback(result, null);
        }).catch((error) => {
            console.log(error)
            callback(null, error);
        });

}

module.exports.uploadMediaToCloudinary = async (files, callback) => {
    var cloudinaryResults = []
    for (var i = 0; i < files.length; i++) {
        if (files[i].path.endsWith(".png") || files[i].path.endsWith(".jpg") || files[i].path.endsWith(".jpeg") || files[i].path.endsWith(".gif") || files[i].path.endsWith(".PNG") || files[i].path.endsWith(".JPG") || files[i].path.endsWith(".JPEG") || files[i].path.endsWith(".GIF")) {
            try {
                var result = await cloudinary.uploader.upload(files[i].path, { upload_preset: 'image_upload' })
                console.log("url: ", result.url, " id : ", result.public_id)
                console.log(`post.js line 67 image upload. the list of files (version: ${i + 1}) uploaded is --> `)
                //let data = { imageURL: result.url, publicId: result.public_id, status: 'success' };
                cloudinaryResults.push({ "cloudinaryurl": result.url, "cloudinaryid": result.public_id, "type": "image" })
                console.log(cloudinaryResults)
            } catch (error) {
                console.log(error)
                return callback(null, error);
            }
        } else {
            try {
                var result = await cloudinary.uploader.upload(files[i].path, { resource_type: "video", chunk_size: 5000000, upload_preset: 'image_upload' })
                console.log("url: ", result.url, " id : ", result.public_id)
                console.log(`post.js line 78 video upload. the list of files (version: ${i}) uploaded is --> `)
                //let data = { imageURL: result.url, publicId: result.public_id, status: 'success' };
                cloudinaryResults.push({ "cloudinaryurl": result.url, "cloudinaryid": result.public_id, "type": "image" })
                console.log(cloudinaryResults)
            } catch (error) {
                console.log(error)
                return callback(null, error);
            }
        }
    }
    return callback(cloudinaryResults, null)
}

module.exports.insertMedia = async (userid, caption, files, callback) => {
    const insertPostQuery = `INSERT INTO post (user_id, caption, media,  date) VALUES ($1, $2, true, NOW() at time zone 'SGT') RETURNING id;`;
    var mediaID = []
    try {
        var returnid = await connection.query(insertPostQuery, [userid, caption])
        console.log("returnid is the following")
        console.log(returnid)
        const insertMediaQuery = 'insert into media (post_id, cloudinaryurl, cloudinaryid, type) values ($1,$2,$3,$4) returning id'
        for (var i = 0; i < files.length; i++) {
            try {
                var InsertMediaResult = await connection.query(insertMediaQuery, [returnid.rows[0].id, files[i].cloudinaryurl, files[i].cloudinaryid, files[0].type])
                mediaID.push(InsertMediaResult.rows[0].id)
                console.log(InsertMediaResult.rows[0].id)
            } catch (err) {
                console.log('media insert fail')
                console.log(err)
                return callback(null, err)
            }
        }
        callback({ mediaID, "message": "media insert into DB worked" }, null)
    } catch (err) {
        console.log("error w sql insert into post table")
        console.log(err)
        callback(null, err)
    }
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
            const feedQuery = `SELECT post.id AS postid, users.id, users.name, users.picurl, post.date, post.editdate, post.content, post.type, post.caption, post.cloudinaryurl, post.media, DATE_PART('day', now()::timestamp - post.date::timestamp) * 24 + 
            DATE_PART('hour', now()::timestamp - post.date::timestamp) as hoursAlive FROM post  INNER JOIN users ON post.user_id = users.id WHERE users.id = ANY ($1) ORDER BY post.date DESC`;

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

module.exports.trendingFeed = async (userid, callback) => {
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
            const feedQuery = `SELECT distinct p.id AS postid, u.id, u.name, u.picurl, p.date, p.editdate, p.content, p.type, p.caption, p.cloudinaryurl, p.media, DATE_PART('day', now()::timestamp - p.date::timestamp) * 24 + DATE_PART('hour', now()::timestamp - p.date::timestamp) as hoursAlive, (select count(post_id) from likes l where l.post_id = p.id ) as NoOfLikes FROM post p, users u, likes l where u.id = p.user_id AND u.id = ANY ($1)  ORDER BY p.date DESC`
            connection.query(feedQuery, [followids])
                .then(results2 => {
                    for(var i = 0;i<results2.rows.length;i++){
                        results2.rows.velocity = 0;
                        var currentRecord = results2.rows[i]
                        var velocity = currentRecord.nooflikes / currentRecord.hoursalive;
                        var velocityDecimal = velocity.toFixed(100)
                        results2.rows[i].velocity = velocityDecimal
                    }
                    results2.rows.sort((a,b)=>{
                        return b.velocity - a.velocity
                    })
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

module.exports.getMediaById = async (id, callback) => {
    const getPostByIdQuery = `SELECT cloudinaryurl, cloudinaryid, type, post_id as postid FROM  media where post_id = $1`;
    connection.query(getPostByIdQuery, [id])
        .then(results => {
            console.log("media could be gotten from db for post " + id)
            if (id == 185) {
                console.log(results)
            }
            console.log(results.rows)
            callback(results.rows, null)
        })
        .catch(err => {
            console.log(err)
            console.log("media could not be gotten from db")
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
module.exports.delete = async (id, callback) => {
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