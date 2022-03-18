const passport = require('passport')

exports.loginController = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('../views/pages/login.ejs')
    }
}

exports.loginControllerPost = passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/user'})