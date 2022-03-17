const session = require("express-session");
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);


const configSession = session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new MySQLStore({
        host: '127.0.0.1',
        port: 3306,
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
    host: "127.0.0.1",
    user: "root",
    database: "users",
    multipleStatements: true
});

module.exports = {configSession, connection};