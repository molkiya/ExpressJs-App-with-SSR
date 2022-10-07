import mysql from "mysql2"
import session from "express-session"
import expressMySqlSession from "express-mysql-session"
import "dotenv/config"

const MySQLStore = expressMySqlSession(session)

const configSession = session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new MySQLStore({
        host: process.env.host__db,
        port: process.env.port__db,
        user: process.env.user__db,
        password: process.env.password__db,
        database: 'cookie_users',
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
})

console.log({
    host: process.env.host__db,
    port: process.env.port__db,
    user: process.env.user__db,
    password: process.env.password__db,
})

const connection = mysql.createConnection({
    host: process.env.host__db,
    port: process.env.port__db,
    user: process.env.user__db,
    password: process.env.password__db,
    database: "users"
});

const connectionBlog = mysql.createConnection({
    host: process.env.host__db,
    port: process.env.port__db,
    user: process.env.user__db,
    password: process.env.password__db,
    database: "posts"
})

connection.connect((err) => {
    if (err) throw err;

    const time = new Date()

    console.log(`Connected to MYSQL DB USERS from ${time}`);
})

connectionBlog.connect((err) => {
    if (err) throw err;

    const time = new Date()

    console.log(`Connected to MYSQL DB POSTS from ${time}`);
})

export {configSession, connectionBlog, connection}