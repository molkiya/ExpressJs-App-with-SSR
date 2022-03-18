const { connectionBlog } = require("../data/data");
const path = require('path')

exports.userController = (req, res, next) => {

    if (!req.isAuthenticated()) {
        res.redirect('/')
    }

    const login = req.user.login;

    connectionBlog.query('SELECT * FROM posts WHERE login=?', [login], (err, result) => {
        if (err) throw new Error(err.message)

        res.render(path.join(__dirname, '../views/pages/user.ejs'), {
            result: result
        })
    })
}