import {genPassword} from "../middleware/passport.middleware.js"
import {connection} from "../data/mysql.data.js";

export const registerController = (req, res) => req.isAuthenticated() ? res.redirect('/') : res.render('../views/pages/register.ejs')

export const registerControllerPost = async (req, res) => {
    const saltHash = genPassword(req.body.password);
    await connection.query('INSERT INTO users(login, hash, salt, isAdmin) VALUES (?, ?, ?, 0)', [req.body.user_name, saltHash.hash, saltHash.salt], (err) => {
        if (err) throw err;
        console.log('Successfully Entered')
    })
    return res.redirect('/login');
}

export const registerControllerFailure = (req, res) => res.send('<h1>Sorry this username is already taken<p><a href="/register">Register again</a></p></h1>')
