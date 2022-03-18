const { connectionBlog } = require("../data/data");
const fs = require('fs')

exports.deleteController = (req, res) => {

    if (!req.isAuthenticated()) {
        res.redirect('/')
    }

    const id = req.params.id;
    console.log(id)

    connectionBlog.query("SELECT * FROM posts WHERE id=?", [id], (err, result) => {
        if (err) throw new Error(err.message)
        let name = result[0].imgvideo;
        fs.unlinkSync(`public/media/${name}`);
    })

    connectionBlog.query("DELETE FROM posts WHERE id=?", [id], (err, result) => {
            if (err) throw new Error(err.message)
        }
    )
    
    res.redirect('/user')
}