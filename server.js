const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const path = require('path');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const crypto = require('crypto');
const configSession = require('./data/data');
const routes = require('./routes/routes');
const logout = require('express-passport-logout');
const app = express();

app.use(configSession);

// app.use
app.use(partials())
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "users",
    multipleStatements: true
});

connection.connect((err) => {
    if (err) throw err;

    console.log('Connected to MYSQL');
})

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

app.get('/', (req, res, next) => {
    res.render('main')
})

app.get('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('login')
    }
})

app.get('/logout', (req, res, next) => {
    req.logout()
    console.log('logout')
    res.redirect('/');
})

app.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in <a href="/protected-route">Go to protected route</a></p>')
})

app.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password')
})

app.get('/register', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('register')
    }
})

app.post('/register', userExists, (req, res, next) => {
    console.log('inside-post')
    console.log(req.body.password);
    const saltHash = genPassword(req.body.password);
    console.log(saltHash);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    connection.query('INSERT INTO users(login, hash, salt, isAdmin) VALUES (?, ?, ?, 0)', [req.body.user_name, hash, salt], (err, result, fields) => {
        if (err) throw err;
        
        console.log('Successfully Entered')
    })

    res.redirect('/login');
})

app.post('/login', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login-success'}));

app.get('/protected-route', isAuth, (req, res, next) => {
    res.send('<h1>You authenticated</h1><p><a href="/logout">Logout and reload</a></p>')
})

app.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('<h1>You are admin</h1><p><a href="/logout">Logout and reload</a></p>')
})

app.get('/notAuthorized', (req, res, next) => {
    console.log('Inside get');
    res.send('<h1>You are not authorized to view the resource</h1><p><a href="/login">Retry login</a></p>')
})

app.get('/notAuthorizedAdmin', (req, res, next) => {
    console.log('Inside get');
    res.send('<h1>You are not authorizedAdmin to view the resource</h1><p><a href="/login">Retry login</a></p>')
})

app.get('/userAlreadyExists', (req, res, next) => {
    console.log('Inside get');
    res.send('<h1>Sorry this username is already taken<p><a href="/register">Register again</a></p></h1>')
})


app.listen(2022, (err) => {
    if (err) throw err;

    console.log(`Server is running on 2022`)
})