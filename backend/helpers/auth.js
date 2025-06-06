'use strict'

var jwt = require('jsonwebtoken');
var moment = require('moment');
var {response} = require('express');

var secret = 'Yessy2010MoraBaloo2311*';

function generateToken (user) {
    const payload = {
        userId: user._id,
        email: user.email
    };
    return jwt.sign(payload, secret, { expiresIn: '7d' });
}

function verifyToken(req, resp, nextStep) {
    try {
        var userToken = req.headers.authorization;
        
        if (!userToken) {
            return resp.status(401).send({message: 'Token requerido'});
        }
        
        var cleanToken = userToken.replace('Bearer ', '');
        var payload = jwt.verify(cleanToken, secret);
        
        req.user = {
            userId: payload.userId,    
            email: payload.email,
        };
        
        nextStep();
    }
    catch (ex) {
        console.error('Token verification error:', ex);
        resp.status(403).send({message: 'Token inválido'});
    }
}

module.exports = {generateToken, verifyToken};