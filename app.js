const debug = require('debug')('app')
const express = require('express');
const app = express();

/* External modules */
const logger = require('morgan');
const bodyParser = require('body-parser');

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
app.get('/exhibits/earlybird', apiExhibits.getEarlyExhibits);
app.get('/exhibits/total', apiExhibits.getExhibits);


/* maintanence */
app.post('/maintain', maintanence.updateDistrict)
app.get('/login', apiUser.checkNaver);

debug('> App initiated')
module.exports = app;