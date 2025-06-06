'use strict'   

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contactSchema = Schema({
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    telefono_fijo: {type: String, default: ''},
    celular: {type: String, required: true},
    email: {type: String, required: true},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    }

}, { timestamps: true })

contactSchema.index({userId: 1, email: 1}, { unique: true });

search: async ({ query, field, limit, page }) => {
    const offset = (page - 1) * limit;
    let whereClause = '';
    let params = [`%${query}%`];

    switch (field) {
      case 'nombres':
        whereClause = 'WHERE nombres ILIKE $1';
        break;
      case 'apellidos':
        whereClause = 'WHERE apellidos ILIKE $1';
        break;
      case 'email':
        whereClause = 'WHERE email ILIKE $1';
        break;
      case 'celular':
        whereClause = 'WHERE celular ILIKE $1';
        break;
        whereClause = 'WHERE nombres ILIKE $1 OR apellidos ILIKE $1 OR email ILIKE $1 OR celular ILIKE $1';
    }

    const searchQuery = `
      SELECT * FROM contacts 
      ${whereClause}
      ORDER BY nombres ASC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    const countQuery = `
      SELECT COUNT(*) as total FROM contacts ${whereClause}
    `;

    params.push(limit, offset);
    
    const [contacts, countResult] = await Promise.all([
      db.query(searchQuery, params),
      db.query(countQuery, [params[0]])
    ]);

    return {
      contacts: contacts.rows,
      total: parseInt(countResult.rows[0].total)
    };
  }


module.exports = mongoose.model('contacts' , contactSchema);