'use strict'   

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('users' , UserSchema);

