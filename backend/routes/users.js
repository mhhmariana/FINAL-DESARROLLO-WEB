'use strict'

var express = require('express');

var userController = require('../controllers/users');
var routes = express.Router();

routes.post('/api/users', userController.createUser);
routes.post('/api/login', userController.loginUser);

module.exports = routes;