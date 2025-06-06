'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var routesUsers = require('./routes/users');
var routesContact = require('./routes/contact');
var cors = require('cors');


var application = express();

application.use(cors());
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({extended: false}));
application.use(routesUsers);
application.use(routesContact);

module.exports = application;