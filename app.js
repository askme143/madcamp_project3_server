const debug = require('debug')('app')
const express = require('express');
const app = express();

/* External modules */
const logger = require('morgan');
const bodyParser = require('body-parser');

/* Put functions in the middleware */
/* logger */
app.use(logger('dev'));

/* Body parser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* server-static */
app.use(express.static('./public'))

/* Get images */
debug('> App initiated')

module.exports = app;