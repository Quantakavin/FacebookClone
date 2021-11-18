const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const friendController = require('./controllers/friendController');
const validation = require('./middlewares/validation');
const authorization = require('./middlewares/authorization');

module.exports = router => {
    router.post('/api/login', validation.validateLogin,userController.loginUser);
    router.post('/api/register', validation.validateRegister, userController.registerUser);
    router.get('/api/user', userController.retrieveUserById)
    router.put('/api/user/:id', userController.updateUser)
    router.get('/api/users', authorization.verifyUser, userController.allUsers)

    router.post('/api/text', authorization.verifyUser, validation.validateText, postController.createText);
    router.post('/api/photo', authorization.verifyUser, validation.validateImage,postController.createPhoto);
    router.put('/api/text/:id', authorization.verifyUser, validation.validateText, postController.updateText);
    router.put('/api/photo/:id', authorization.verifyUser, validation.validateImage,postController.updatePhoto);
    router.post('/api/video', authorization.verifyUser, postController.createVideo);
    router.get('/api/feed', authorization.verifyUser, postController.getFeed)
    router.get('/api/post/:id', authorization.verifyUser, postController.getPost)

    router.post('/api/friend', authorization.verifyUser, friendController.friend);
    router.delete('/api/friend', authorization.verifyUser, friendController.unfriend);
}