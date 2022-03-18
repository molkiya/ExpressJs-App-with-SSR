const { connectionBlog } = require("../data/data");

exports.postMyPostController = (req, res, next) => {

    if (!req.isAuthenticated()) {
        res.redirect('/')
    }

    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    }

    const login = req.user.login;
    const imgvideo = req.file.filename;
    const text = req.body.textNewPost;
    const time = new Date().toLocaleString("ru", options).toString()

    if (!imgvideo) {
        connectionBlog.query("INSERT INTO posts (time, login, text) VALUES (?, ?, ?)", [time, login, text],(err, result) => {
                if (err) throw err;
            }
        )
    } else {
        connectionBlog.query("INSERT INTO posts (time, login, text, imgvideo) VALUES (?, ?, ?, ?)", [time, login, text, imgvideo],(err, result) => {
                if (err) throw err;
            }
        )
    }

    res.redirect('/')
}