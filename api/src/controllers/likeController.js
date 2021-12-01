const like = require('../models/likes');


module.exports.like = async (req, res) => {
    try {
        let { userid, postid } = req.body;
        await like.insert(userid, postid, (results, error) => {      //calling of model method(function) for like 
            if (error) {
                res.status(500).json({ message: "Internal Server Error!" });
            } else {
                return res.status(201).send(results);
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

module.exports.unlike = async (req, res) => {
    try {
        let { userid, postid } = req.body;
        await like.delete(userid, postid, (results, error) => {      //calling of model method(function) for deleting the likes
            if (error) {
                res.status(500).json({ message: "Internal Server Error!" });
            } else {
                return res.status(204).send(results);
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

//this was when i thought the post was not a component. dont use
// module.exports.getLikesInfo = async (req, res) => {
//     //get all posts from friends
//     //get like count for each post
//     //get like status for those the user has liked. 
//     try {
//         let { userid } = req.body;
//         await like.getInfo(userid, (results, error) => {
//             if (error) {
//                 res.status(500).json({ message: "Internal Server Error!" });
//             } else {
//                 console.log(results)
//                 /* results is an obj. eg below
//                 {
//                     likedPosts: [ 1, 2, 3, 5, 6, 51 ],
//                     feedLikes: [
//                         { postid: 51, likes: '7' },
//                         { postid: 3, likes: '7' },
//                         { postid: 5, likes: '7' },
//                         { postid: 6, likes: '7' },
//                         { postid: 2, likes: '7' },
//                         { postid: 1, likes: '7' }
//                       ]
//                 }
//                 */
//                 return res.status(200).send(results);
//             }
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Internal Server Error!" });
//     }
// }


module.exports.getPostLikeInfo = async (req, res) => {
    try {
        let { userid, postid } = req.params;
        await like.getPostLikesInfo(userid, postid, (results, error) => {
            if (error) {
                res.status(500).json({ message: "Internal Server Error!" });
            } else {
                console.log(results)
                console.log("likeController line 78")
                return res.status(200).send(results);
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}