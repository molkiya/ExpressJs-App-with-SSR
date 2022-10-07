import * as path from "path";
import { connectionBlog } from "../data/mysql.data.js";

export const mainController = async (req, res) => {
    let auth = false;
    if (req.isAuthenticated()) {
        auth = true;
    }
    await connectionBlog.query('SELECT * FROM posts', (err, result) => {
        if (err) throw err;

        res.render(path.join("../views/pages/main.ejs"), {
            result: result,
            auth: auth
        })
    })
}