import express from "express";

import {mainController} from "./controllers/main.controller.js";
import {deleteController, postMyPostController, userController} from "./controllers/user.controller.js";
import {
    loginController,
    loginControllerPost,
    loginFailureController,
    logoutController
} from "./controllers/login.controller.js";
import {
    registerController,
    registerControllerFailure,
    registerControllerPost
} from "./controllers/register.controller.js";

const routes = express.Router();

routes.get('/', mainController);

routes.get('/login', loginController)

routes.post('/login', loginControllerPost)

routes.get('/logout', logoutController)

routes.get('/loginfailure', loginFailureController)

routes.get('/register', registerController)

routes.post('/register', registerControllerPost)

routes.get('/useralreadyexists', registerControllerFailure)

routes.post('/postmypost', postMyPostController)

routes.get('/user', userController)

routes.get('/delete/:id', deleteController)

export default routes
