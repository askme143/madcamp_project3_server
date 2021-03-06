const debug = require('debug')('app')
const express = require('express');
const app = express();

/* External modules */
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

/* My modules(apis) */
const apiExhibits = require('./api/exhibits');
const apiUser = require('./api/user');

/* Put functions in the middleware */
/* logger */
app.use(logger('dev'));

/* server-static */
app.use(express.static('./public'))

/* Body parser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Page access */
app.get('/', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "/public/main.html");
})
app.get('/exhibits', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "/public/exhibits.html");
})
app.get('/login', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "/public/login.html");
})
app.get('/login/naver', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "/public/loginNaver.html");
})
app.get('/signup', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "/public/signup.html");
})
app.get('/signup/naver', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "/public/signupNaver.html");
})

/* DB Upload */
app.post('/exhibits/upload', apiExhibits.putExhibits);

/* Exhibits page */
app.get('/exhibits/total', apiExhibits.getExhibits);
app.get('/exhibits/earlybird', apiExhibits.getEarlyExhibits)
app.get('/exhibits/almostdone', apiExhibits.getEarlyExhibits)

/* Login */
/* login session*/
app.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24000 * 60 * 60
    }
}))
app.get('/login/naver/check', apiUser.checkNaver);
app.post('/signup', apiUser.signupUser);
app.get('/loginCheck', apiUser.loginCheck);
app.get('/logout', apiUser.logout);

debug('> App initiated')
module.exports = app;