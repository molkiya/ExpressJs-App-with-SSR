exports.logoutController = (req, res, next) => {
    req.logout()
    console.log('logout')
    res.redirect('/');
}