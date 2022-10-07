import passport from "passport";
import * as crypto from "crypto";
import {connection} from "../data/mysql.data.js";
import {Strategy} from "passport-local"

const verifyCallback = async (login, password, done) => {
    await connection.query(`SELECT *
                            FROM users
                            WHERE login = ?`, [login], (err, result, fields) => {
        if (err) throw err;
        if (result.length == 0) return done(null, false)
        if (validPassword(password, result[0].hash, result[0].salt)) {
            return done(null, {
                id: result[0].id,
                login: result[0].login,
                hash: result[0].hash,
                salt: result[0].salt
            })
        } else {
            return done(null, false)
        }
    });
};

passport.use(new Strategy({
    usernameField: 'user_name',
    passwordField: 'password',
}, verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (userId, done) => {
    await connection.query('SELECT * FROM users where id = ?', [userId], (err, result) => {
        done(null, result[0])
    })
})

const validPassword = (password, hash, salt) => {
    return hash === crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
}

const genPassword = (password) => {
    let salt = crypto.randomBytes(32).toString('hex');
    return {
        salt,
        hash: crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex')
    }
}

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/notAuthorized');
    }
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin === 1) {
        next();
    } else {
        res.redirect('/notAuthorizedAdmin');
    }
}

const userExists = async (req, res, next) => {
    await connection.query("SELECT * FROM users WHERE login=?", [req.body.user_name], (err, result, fields) => {
        if (err) throw err;

        if (result.length > 0) {
            res.redirect('/userAlreadyExists')
        } else {
            next()
        }
    })
}

export {genPassword, isAuth, isAdmin, userExists}