const passport = require('passport');
const { connection } = require('./data/data')
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;

const customFields = {
    usernameField: 'user_name',
    passwordField: 'password',
}

const verifyCallback = (login, password, done) => {
    connection.query(`SELECT * FROM users WHERE login = ?`, [login], (err, result, fields) => {
        if (err) throw err;

        if (result.length == 0) {
            return done(null, false)
        }

        const isValid = validPassword(password, result[0].hash, result[0].salt);
        
        let user = {
            id: result[0].id,
            login: result[0].login,
            hash: result[0].hash,
            salt: result[0].salt
        }

        if (isValid) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    });
};

passport.use(new LocalStrategy(customFields, verifyCallback));

passport.serializeUser((user, done) => {
    console.log("inside serializer" + user.id);
    done(null, user.id);
})

passport.deserializeUser((userId, done) => {
    console.log("deserializedUser" + userId);
    connection.query('SELECT * FROM users where id = ?', [userId], (err, result) => {
        done(null, result[0])
    })
})

const validPassword = (password, hash, salt) => {
    let hashVarify = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
    return hash === hashVarify;
}

const genPassword = (password) => {
    let salt = crypto.randomBytes(32).toString('hex');
    let genhash = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
    return {
        salt,
        hash: genhash
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

const userExists = (req, res, next) => {
    connection.query("SELECT * FROM users WHERE login=?", [req.body.user_name], (err, result, fields) => {
        if (err) throw err;

        if (result.length>0) {
            res.redirect('/userAlreadyExists')
        } else {
            next()
        }
    })
}

module.exports = { genPassword, isAuth, isAdmin, userExists }