const userController = require('./controllers/userController');

module.exports = router => {
    router.post('/api/login', userController.loginUser);
    router.post('/api/register', userController.registerUser);
    router.get('/api/user/:id', userController.retrieveUserById)
    router.put('/api/user/:id', userController.updateUser)
}