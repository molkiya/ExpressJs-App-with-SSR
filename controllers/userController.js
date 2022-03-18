exports.userController = (req, res, next) => {

    const login = req.user.login;

    connectionBlog.query('SELECT * FROM posts WHERE login=?', [login], (err, result) => {
        if (err) throw new Error(err.message)

        res.render(path.join(__dirname, '../views/pages/user.ejs'), {
            result: result
        })
    })
}