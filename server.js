const passport = require('passport');
const express = require('express');
const path = require('path');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/routes.js');
const {configSession} = require('./data/data');

const app = express();

// port

const port = process.env.PORT || 2022;

// app.config

app.use(configSession);
app.use(partials());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

// notifications about work server

app.use(routes);

app.listen(port, (err) => {
    if (err) throw err;

    console.log(`Server is running on ${port}`)
})