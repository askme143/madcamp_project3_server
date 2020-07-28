const debug = require('debug')('app')
const express = require('express');
const app = express();

/* External modules */
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

/* My modules(apis) */
const apiDB = require('./api/db');
const apiExhibits = require('./api/exhibits');
const apiUser = require('./api/user');

/* Module for maintanence */
const maintanence = require('./maintanence/db_update');

/* Put functions in the middleware */
/* logger */
app.use(logger('dev'));

/* server-static */
app.use(express.static('./public'))

/* Body parser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* DB Upload */
app.post('/exhibits/upload', apiDB.putExhibits);

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
app.get('/loginNaver', apiUser.checkNaver);
app.post('/signup', apiUser.signupUser);
app.get('/loginCheck', apiUser.loginCheck);
app.get('/logout', apiUser.logout);

/* maintanence */
app.post('/maintain', maintanence.updateDistrict)
debug('> App initiated')
module.exports = app;