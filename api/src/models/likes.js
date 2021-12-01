// post id 
// user id

const connection = require('../config/database'); 

module.exports.like = async (userid, postid, callback) => {
    const insertlikequery = `INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`;
    connection.query(insertlikequery, [userid, postid])
        .then(returnid => {

            callback(returnid, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.unlike = async (userid, postid, callback) => {
    const deletelikequery = `DELETE FROM likes WHERE( user_id = $1 AND post_id = $2)`;   //Method to unlike 
    connection.query(deletelikequery, [userid, postid])
        .then(returnid => {

            callback(returnid, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

module.exports.check = async (userid, postid, callback) => {
    const checklikequery = `SELECT EXISTS (SELECT * FROM likes WHERE user_id=$1 and post_id=$2)`;   //Method to unlike 
    connection.query(checklikequery, [userid, postid])
        .then(results => {
            console.log(results)
            callback(results, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}

/*
module.exports.getInfo = async (userid, postid, callback) => {
    var finalResult= {
        postid,
        likes: 0,
        likedByCurrentUser: false
    }
    var getLikeCount = `SELECT post_id, count(post_id) likes FROM "public"."likes" where post_id = $1 group by post_id`
    connection.query(getLikeCount, [postid])
        .then(likeCount => {
            console.log(likeCount.rows)
            console.log(" line 102")
            if (likeCount.rows.length > 0) {
                finalResult.likes += likeCount.rows[0].likes
            }
            var isPostLikedByUser = `SELECT * FROM "public"."likes" where user_id = $1 AND post_id = $2`
            connection.query(isPostLikedByUser, [userid,postid])
                .then(
                    isLikedResult => {
                        console.log(isLikedResult.rows)
                        console.log(" line 110")                        
                        if(isLikedResult.rows.length>0){
                            finalResult.likedByCurrentUser=true
                        }
                        console.log(finalResult)
                        console.log(" line 114")
                        callback(finalResult,null)
                    }
                )
                .catch(err => {
                    console.log(err)
                    callback(null, err)
                })
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}
*/

module.exports.getInfo = async (postid, callback) => {
    const getLikeCount = `SELECT * FROM likes where post_id = $1`;   //Method to unlike 
    connection.query(getLikeCount, [postid])
        .then(results => {
            console.log(results)
            callback(results, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}