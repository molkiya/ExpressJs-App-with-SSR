const path = require('path')
const { connectionBlog } = require('../data/data');

exports.mainController = (req, res, next) => {

    let auth = false;

    if (req.isAuthenticated()) {
        auth = true;
    }

    connectionBlog.query('SELECT * FROM posts', (err, result) => {
        if (err) throw err;

        res.render(path.join("../views/pages/main.ejs"), {
            result: result,
            auth: auth
        })
    })
}