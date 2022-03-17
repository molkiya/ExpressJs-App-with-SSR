const passport = require('passport');
const express = require('express');
const path = require('path');
const partials = require('express-partials');
const bodyParser = require('body-parser');

const {configSession, connection} = require('./data/data');
const { genPassword, isAuth, isAdmin, userExists } = require('./passport');

const app = express();

// port

const port = process.env.PORT || 2022;

// app.config

app.use(configSession);
app.use(partials())
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

// routes

app.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render(path.join(__dirname, '/views/logged/main.ejs'))
    } else {
        res.render(path.join(__dirname, '/views/unlogged/main.ejs'))
    }
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

app.get('/user', (req, res, next) => {
    res.render('user')
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

app.post('/login', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/user'}))

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

// notifications about work server

connection.connect((err) => {
    if (err) throw err;

    console.log('Connected to MYSQL');
})

app.listen(port, (err) => {
    if (err) throw err;

    console.log(`Server is running on ${port}`)
})