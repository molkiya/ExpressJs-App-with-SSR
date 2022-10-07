import { connectionBlog } from "../data/mysql.data.js";
import * as path from "path";
import fs from "fs/promises";

export const userController = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/')
    }
    await connectionBlog.query('SELECT * FROM posts WHERE login=?', [req.user.login], (err, result) => {
        if (err) throw new Error(err.message)

        res.render(path.join(__dirname, '../views/pages/user.ejs'), {
            result: result
        })
    })
}

export const postMyPostController = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/')
    }
    const login = req.user.login;
    const imgvideo = req.file.filename;
    const text = req.body.textNewPost;
    const time = new Date().toLocaleString("ru", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    }).toString()
    if (!imgvideo) {
        await connectionBlog.query("INSERT INTO posts (time, login, text) VALUES (?, ?, ?)", [time, login, text],(err, result) => {
            if (err) throw err;
        })
    } else {
        await connectionBlog.query("INSERT INTO posts (time, login, text, imgvideo) VALUES (?, ?, ?, ?)", [time, login, text, imgvideo],(err, result) => {
            if (err) throw err;
        })
    }
    res.redirect('/')
}

export const deleteController = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/')
    }
    await connectionBlog.query("SELECT * FROM posts WHERE id=?", [req.params.id], async (err, result) => {
        if (err) throw new Error(err.message)
        let name = result[0].imgvideo;
        await fs.unlink(`public/media/${name}`);
    })
    await connectionBlog.query("DELETE FROM posts WHERE id=?", [req.params.id], (err, result) => {
        if (err) throw new Error(err.message)
    })
    res.redirect('/user')
}