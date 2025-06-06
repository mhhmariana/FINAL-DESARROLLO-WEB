'use strict'

var User = require('../models/users');
var token = require('../helpers/auth');
var bcrypt = require('bcryptjs');

function createUser(req, resp) {
    var parameters = req.body;

    var salt = bcrypt.genSaltSync(15);

    var newUser = new User();
    newUser.email = parameters.email;
    newUser.password = bcrypt.hashSync(parameters.password, salt);

    newUser.save().then(
        (userSaved) => {
            resp.status(200).send({message: 'User created successfully'});
        },
        (error) => {
            resp.status(500).send({message: 'Error creating user', 'error': error});
        }
    );
}

function loginUser(req, resp) {
    var parameters = req.body;

    User.findOne({'email': parameters.email}).then(
        (userFound) => {
            if (userFound == null) {
                return resp.status(403).send({message: 'User not found'});
            }
            if (bcrypt.compareSync(parameters.password, userFound.password)) {
                return resp.status(200).send({message: 'Login successful', token: token.generateToken(userFound)});
            } 
            else {
                return resp.status(403).send({message: 'Invalid login'});
            }
        }
    ).catch(error => {
        console.error('Login error:', error);
        return resp.status(500).send({message: 'Error logging in', error: error});
    });
}



module.exports = {createUser, loginUser};