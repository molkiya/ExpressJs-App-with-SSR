const Routes = require('express');
const passport = require('passport');
const path = require('path');
const routes = Routes();
// const uuid = require('uuid');
// const jwt = require('jsonwebtoken');

const mainController = require('../controllers/mainController.js');
const logoutController = require('../controllers/logoutController.js');
const loginController = require('../controllers/loginController.js');
const loginFailureController = require('../controllers/loginFailureController.js');
const registerController = require('../controllers/registerController.js');
const postMyPostController = require('../controllers/postMyPostController.js');
const userController = require('../controllers/userController.js');
const deleteController = require('../controllers/deleteController.js');

// routes

routes.get('/', mainController.mainController)

routes.get('/login', loginController.loginController)

routes.post('/login', loginController.loginControllerPost)

routes.get('/logout', logoutController.logoutController)

routes.get('/login-failure', loginFailureController.loginFailureController)

routes.get('/register', registerController.registerController)

routes.post('/register', registerController.registerControllerPost)

routes.get('/userAlreadyExists', registerController.registerControllerFailure)

routes.post('/postMyPost', postMyPostController.postMyPostController)

routes.get('/user', userController.userController)

routes.get('/delete/:id', deleteController.deleteController)

module.exports = routes;

