const userController = require('./controllers/userController');
const validation = require('./middlewares/validation');

module.exports = router => {
    router.post('/api/login', userController.loginUser);
    router.post('/api/register', validation.validateRegister, userController.registerUser);
    router.get('/api/user/:id', userController.retrieveUserById)
    router.put('/api/user/:id', userController.updateUser)
}