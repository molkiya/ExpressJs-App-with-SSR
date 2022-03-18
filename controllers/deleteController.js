const { connectionBlog } = require("../data/data");


exports.deleteController = (req, res) => {
    const id = req.params.id;
    console.log(id)

    connectionBlog.query("DELETE FROM posts WHERE id=?", [id], (err, result) => {
        if (err) throw new Error(err.message)
    })

    res.redirect('/user')
}