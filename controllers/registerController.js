const { genPassword, userExists } = require('../middleware/passport');
const { connection } = require('../data/data');

exports.registerController = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('../views/pages/register.ejs')
    }
}

exports.registerControllerPost = (req, res, next) => {
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
}

exports.registerControllerFailure = (req, res, next) => {
    res.send('<h1>Sorry this username is already taken<p><a href="/register">Register again</a></p></h1>')
}