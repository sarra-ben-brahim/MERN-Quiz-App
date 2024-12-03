const userController = require('../controllers/controller.user');

module.exports = (app) => {
    app.post('/api/register', userController.register);
    app.post('/api/login', userController.login);
};