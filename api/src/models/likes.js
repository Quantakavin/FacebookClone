// post id 
// user id

const connection = require('../config/database');

module.exports.like = async (userid, postid, callback) => {
    const insertlikequery = `INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING id;`;
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

// module.exports.getInfo = async (userid, callback) => {
//     let followids = [userid]
//     let feedIDs = []
//     let totalResult = {
//         likedPosts:[],
//         feedLikes:[]
//     }
//     const followQuery = "SELECT * FROM friendship WHERE user_id =$1 OR friend_id = $1";
//     connection.query(followQuery, [userid])
//         .then(result => {
//             for (let i = 0; i < result.rows.length; i++) {
//                 if (result.rows[i].user_id != userid) {
//                     followids.push(result.rows[i].user_id)
//                 }
//                 if (result.rows[i].friend_id != userid) {
//                     followids.push(result.rows[i].friend_id)
//                 }
//             }            
//             console.log("followids are "+followids)
//             const feedQuery = `SELECT post.id AS postid FROM post WHERE user_id = ANY ($1)`;
//             connection.query(feedQuery, [followids])
//                 .then(feedResults => {
//                     for(var q = 0; q<feedResults.rows.length;q++){
//                         feedIDs.push(feedResults.rows[q].postid)
//                     }
//                     const likeCountForAllPosts = `SELECT post_id as postid, count(post_id) likes FROM "public"."likes" where post_id = any ($1) group by post_id`
//                     connection.query(likeCountForAllPosts,[feedIDs])
//                     .then(likeResults => {
//                         totalResult.feedLikes = likeResults.rows//its an array of {postid: x, likes: x}
//                         const postsLikedByCurrentUser = `SELECT post_id as likedPost FROM "public"."likes" where user_id = ($1) `
//                         connection.query(postsLikedByCurrentUser,[userid])
//                         .then(likedPostInfo => {
//                             console.log(likedPostInfo.rows)
//                             for(var t = 0;t<likedPostInfo.rows.length;t++){
//                                 totalResult.likedPosts.push(likedPostInfo.rows[t].likedpost)
//                             }
//                             callback(totalResult, null)
//                         }

//                         )
//                         .catch(error => {
//                             console.log(error)
//                             callback(null, error)
//                         })
//                     }
//                     )
//                     .catch(error => {
//                         console.log(error)
//                         callback(null, error)
//                     })
//                 })
//                 .catch(error => {
//                     console.log(error)
//                     callback(null, error)
//                 })
//         })
//         .catch(err => {
//             console.log(err)
//             callback(null, err)
//         })
// }

module.exports.getInfo = async (userid, callback) => {
    let followids = [userid]
    let feedIDs = []
    let totalResult = {
        likedPosts:[],
        feedLikes:[]
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