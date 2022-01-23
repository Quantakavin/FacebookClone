const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const friendController = require('./controllers/friendController')
const commentController = require('./controllers/commentController')
const searchController = require('./controllers/searchController')
const likeController = require('./controllers/likeController')
const messageController = require('./controllers/messageController')
const conversationController = require('./controllers/conversationController')
const validation = require('./middlewares/validation')
const authorization = require('./middlewares/authorization')
const notificationController = require('./controllers/notificationController')
module.exports = (router) => {
    router.post(
        '/api/login',
        validation.validateLogin,
        userController.loginUser
    )
    router.post(
        '/api/register',
        validation.validateRegister,
        userController.registerUser
    )
    router.get('/api/UserData/:gottenID', userController.retrieveUserById)
    router.put(
        '/api/User/',
        authorization.verifyUser,
        userController.updateUser
    )
    router.put(
        '/api/Password',
        authorization.verifyUser,
        userController.updateUserPassword
    )
    router.put(
        '/api/PFP',
        authorization.verifyUser,
        validation.validateImage,
        userController.updatePFP
    )
    router.get('/api/users', authorization.verifyUser, userController.allUsers)
    router.get('/api/privacy', userController.privacyStatus)

    router.post(
        '/api/text',
        authorization.verifyUser,
        validation.validateText,
        postController.createText
    )
    router.post(
        '/api/photo',
        authorization.verifyUser,
        validation.validateImage,
        postController.createPhoto
    )
    router.post(
        '/api/video',
        authorization.verifyUser,
        validation.validateVideo,
        postController.createVideo
    )
    router.put(
        '/api/text/:id',
        authorization.verifyUser,
        validation.validateText,
        postController.updateText
    )
    router.put(
        '/api/photo/:id',
        authorization.verifyUser,
        validation.validateImage,
        postController.updatePhoto
    )
    router.put(
        '/api/video/:id',
        authorization.verifyUser,
        validation.validateVideo,
        postController.updateVideo
    )
    router.post(
        '/api/video',
        authorization.verifyUser,
        postController.createVideo
    )
    router.get('/api/feed', authorization.verifyUser, postController.getFeed)
    router.get('/api/posts/:userid', postController.getPosts)
    router.get(
        '/api/post/:id',
        authorization.verifyUser,
        postController.getPost
    )
    router.delete(
        '/api/post/:id',
        authorization.verifyUser,
        postController.deletePost
    )

    router.get('/api/comments/:id', commentController.getAllComments)
    router.get(
        '/api/comment/:id',
        authorization.verifyUser,
        commentController.getComment
    )
    router.put(
        '/api/comment/:id',
        authorization.verifyUser,
        commentController.updateComment
    )
    router.post(
        '/api/comment',
        authorization.verifyUser,
        commentController.createComment
    )
    router.delete(
        '/api/comment/:id',
        authorization.verifyUser,
        commentController.deleteComment
    )
    router.post(
        '/api/friend',
        authorization.verifyUser,
        friendController.friend
    )
    router.delete(
        '/api/friend',
        authorization.verifyUser,
        friendController.unfriend
    )
    router.post('/api/friendship', friendController.checkFriendship)

    router.post('/api/like', authorization.verifyUser, likeController.like)
    router.delete(
        '/api/like/:id',
        authorization.verifyUser,
        likeController.unlike
    )
    router.get(
        '/api/userlike/:id',
        authorization.verifyUser,
        likeController.checklike
    )
    router.get('/api/FeedLikes/:id', likeController.getLikesInfo)

    router.post(
        '/api/conversation',
        authorization.verifyUser,
        conversationController.newConversation
    )
    router.get(
        '/api/conversations/:userid',
        authorization.verifyUser,
        conversationController.getConversations
    )

    router.post(
        '/api/message',
        authorization.verifyUser,
        messageController.newMessage
    )
    router.get(
        '/api/messages',
        authorization.verifyUser,
        messageController.getMessages
    )

    router.get('/api/searchUser', searchController.searchUser)

    router.post('/api/notification', notificationController.sendNotification)
}
