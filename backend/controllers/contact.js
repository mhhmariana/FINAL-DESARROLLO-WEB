'use strict'

var Contact = require("../models/contact"); 

function createContact(req, resp) {

    var contactReqBody = req.body;

    var newContact = new Contact();
    newContact.nombre = contactReqBody.nombre;
    newContact.apellidos = contactReqBody.apellidos;
    newContact.telefono_fijo = contactReqBody.telefono_fijo;
    newContact.celular = contactReqBody.celular;
    newContact.email = contactReqBody.email;
    newContact.userId = req.user.userId;


    if (
    !newContact.nombre || newContact.nombre.trim() === '' ||
    !newContact.apellidos || newContact.apellidos.trim() === '' ||
    !newContact.telefono_fijo || newContact.telefono_fijo.trim() === '' ||
    !newContact.celular || newContact.celular.trim() === '' ||
    !newContact.email || newContact.email.trim() === ''
) {
    return resp.status(400).send({'message': 'One or more required fields were not sent correctly'});
}

    newContact.save().then(
        (savedContact) => {
            resp.status(200).send({'message': 'Contact created successfully', 'contact': savedContact});
        },
        err => {
            resp.status(500).send({'message': 'An error occurred while creating the contact', 'error': err});
        }
    );
}

function editContact(req, resp) {
    var contactToEdit = req.params._id;
    var contactNewValues = req.body;

    Contact.findByIdAndUpdate(contactToEdit, contactNewValues, { new: true }).then(
        (editedContact) => {
            resp.status(200).send({'message': 'Contact was edited successfully', 'contact': editedContact});
        },
        err => {
            resp.status(500).send({'message': 'An error occurred while editing the contact', 'error': err});
        }
    );
}

function deleteContact(req, resp) {

    var contactToDelete = req.params._id;

    Contact.findByIdAndDelete(contactToDelete).then(
        (deletedContact) => {
            resp.status(200).send({'message': 'Contact deleted successfully', 'contact': deletedContact});
        },
        err => {
            resp.status(500).send({'message': 'An error ocurred while deleting the contact', 'error': err});
        }
    );
}

const searchContacts = async (req, res) => {
  try {
    const { q, field = 'all', limit = 10, page = 1 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const searchResult = await Contact.search({
      query: q,
      field: field,
      limit: parseInt(limit),
      page: parseInt(page)
    });

    res.json({
      success: true,
      data: searchResult.contacts,
      pagination: {
        total: searchResult.total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(searchResult.total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
async function getContacts(req, res) {
    try {
        const contacts = await Contact.find({ userId: req.user.userId })
                                     .sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener contactos', error: error.message });
    }
}

module.exports = {
   createContact,
   editContact,
   deleteContact,
   getContacts,
   searchContacts
}