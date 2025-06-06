'use strict'

var mongoose = require('mongoose');
var application = require('./application');

mongoose.connect('mongodb://localhost:27017/FINAL_DEV_WEB').then(
    () => {
        console.log("Database connection succesful. Starting application");
        application.listen(6545, function(){
            console.log("Application started on port 6545");
        });
    },
    err => {
        console.log("Error when connecting to database. Application not started. " + err);
    }
);