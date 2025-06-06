'use strict'

var express = require('express');
var router = express.Router();
var token = require('../helpers/auth');

var contactsController = require('../controllers/contact');


router.post('/api/contact', token.verifyToken, contactsController.createContact);
router.put('/api/contact/:_id', token.verifyToken, contactsController.editContact);
router.delete('/api/contact/:_id', token.verifyToken, contactsController.deleteContact);

router.get('/api/contact', token.verifyToken, contactsController.getContacts);


module.exports = router;
