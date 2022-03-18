exports.logoutController = (req, res, next) => {
    req.logout()
    res.redirect('/');
}