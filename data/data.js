const session = require("express-session");
const mysql = require('mysql');
const path = require('path');
const MySQLStore = require('express-mysql-session')(session);


const configSession = session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new MySQLStore({
        host: process.env.host,
        port: process.env.port,
        user: 'root',
        database: 'cookie_users'
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24,
    }
})

const connection = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: "root",
    database: "users",
    multipleStatements: true
});

const connectionBlog = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: "root",
    database: "posts",
    multipleStatements: true
})

connection.connect((err) => {
    if (err) throw err;

    console.log(`Connected to MYSQL DB USERS`);
})

connectionBlog.connect((err) => {
    if (err) throw err;

    console.log(`Connected to MYSQL DB POSTS`);
})

module.exports = {configSession, connection, connectionBlog};