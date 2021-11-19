const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const friendController = require('./controllers/friendController');
const validation = require('./middlewares/validation');
const authorization = require('./middlewares/authorization');

module.exports = router => {
    router.post('/api/login', validation.validateLogin, userController.loginUser);
    router.post('/api/register', validation.validateRegister, userController.registerUser);
    router.get('/api/user', userController.retrieveUserById)
    router.put('/api/updateUser', /*authorization.verifyUser, validation.validateImageForProfile,*/ userController.updateUser)
    router.put("/api/updatePassword",userController.updateUserPassword)
    router.get('/api/users', authorization.verifyUser, userController.allUsers)

    router.post('/api/text', authorization.verifyUser, validation.validateText, postController.createText);
    router.post('/api/photo', authorization.verifyUser, validation.validateImage, postController.createPhoto);
    router.post('/api/video', authorization.verifyUser, postController.createVideo);
    router.get('/api/feed', authorization.verifyUser, postController.getFeed)

    router.post('/api/friend', authorization.verifyUser, friendController.friend);
    router.delete('/api/friend/:id', authorization.verifyUser, friendController.unfriend);
}