const Routes = require('express');
const passport = require('passport');
const path = require('path');
const routes = Routes();
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const { genPassword, userExists } = require('../middleware/passport');
const { connection, connectionBlog } = require('../data/data');

// routes

routes.get('/', (req, res, next) => {

    let auth = false;

    if (req.isAuthenticated()) {
        auth = true;
    }

    connectionBlog.query('SELECT * FROM posts', (err, result) => {
        if (err) throw new Error(err.message)

        res.render(path.join("../views/pages/main.ejs"), {
            result: result,
            auth: auth
        })
    })
})

routes.get('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('../views/pages/login.ejs')
    }
})

routes.get('/logout', (req, res, next) => {
    req.logout()
    console.log('logout')
    res.redirect('/');
})

routes.get('/user', (req, res, next) => {

    const login = req.user.login;

    connectionBlog.query('SELECT * FROM posts WHERE login=?', [login], (err, result) => {
        if (err) throw new Error(err.message)

        res.render(path.join(__dirname, '../views/pages/user.ejs'), {
            result: result
        })
        
    })
})

routes.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password')
})

routes.get('/register', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('../views/pages/register.ejs')
    }
})

routes.post('/register', userExists, (req, res, next) => {
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

routes.post('/login', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/user'}))

routes.get('/notAuthorized', (req, res, next) => {
    console.log('Inside get');
    res.send('<h1>You are not authorized to view the resource</h1><p><a href="/login">Retry login</a></p>')
})

routes.get('/notAuthorizedAdmin', (req, res, next) => {
    console.log('Inside get');
    res.send('<h1>You are not authorizedAdmin to view the resource</h1><p><a href="/login">Retry login</a></p>')
})

routes.get('/userAlreadyExists', (req, res, next) => {
    console.log('Inside get');
    res.send('<h1>Sorry this username is already taken<p><a href="/register">Register again</a></p></h1>')
})

routes.post('/postMyPost', (req, res, next) => {
    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    }

    const login = req.user.login;

    const text = req.body.textNewPost;
    const time = new Date().toLocaleString("ru", options).toString()

    connectionBlog.query("INSERT INTO posts (time, login, text) VALUES (?, ?, ?)", [time, login, text],(err, result) => {
            if (err) throw err;
        }
    )

    res.redirect('/')
})

module.exports = routes;

