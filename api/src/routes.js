const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const friendController = require('./controllers/friendController');
const commentController = require('./controllers/commentController');
const likeController = require('./controllers/likeController');
const validation = require('./middlewares/validation');
const authorization = require('./middlewares/authorization');
module.exports = router => {
    router.post('/api/login', validation.validateLogin, userController.loginUser);
    router.post('/api/register', validation.validateRegister, userController.registerUser);
    // router.get('/api/getUser/:gottenID ', userController.retrieveUserById) //this one dont work and idk why, it is replaced with next line
    router.get('/api/getDataOfUser/:gottenID',userController.retrieveUserById)
    router.put('/api/updateUser/', authorization.verifyUser, userController.updateUser)
    router.put('/api/updatePassword', authorization.verifyUser,userController.updateUserPassword)
    router.put('/api/updatePFP', authorization.verifyUser,validation.validateImage, userController.updatePFP)
    router.get('/api/users', authorization.verifyUser, userController.allUsers)

    router.post('/api/text', authorization.verifyUser, validation.validateText, postController.createText);
    router.post('/api/photo', authorization.verifyUser, validation.validateImage, postController.createPhoto);
    router.put('/api/text/:id', authorization.verifyUser, validation.validateText, postController.updateText);
    router.put('/api/photo/:id', authorization.verifyUser, validation.validateImage, postController.updatePhoto);
    router.post('/api/video', authorization.verifyUser, postController.createVideo);
    router.get('/api/feed', authorization.verifyUser, postController.getFeed)
    router.get('/api/post/:id', authorization.verifyUser, postController.getPost)
    router.delete('/api/post/:id', authorization.verifyUser, postController.deletePost)

    router.get('/api/getComments', commentController.getAllComments)
    router.put('/api/updateComment', commentController.updateComment)
    router.post('/api/createComment', commentController.createComment)
    router.delete('/api/deleteComment', commentController.deleteComment)
    
    router.post('/api/friend', authorization.verifyUser, friendController.friend);
    router.delete('/api/friend', authorization.verifyUser, friendController.unfriend);


    router.post('/api/like', authorization.verifyUser,likeController.like )
    router.delete('/api/like', authorization.verifyUser,likeController.unlike )
}