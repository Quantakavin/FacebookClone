var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/database');

var validator = require('validator');

module.exports.search =  async (name, callback) => {
    const searchquery = 'SELECT * FROM users where name LIKE $1 '
    connection.query(searchquery, ['%' + name + '%'])
    .then(result => {
        console.log(result.rows[0])
        callback(result.rows[0], null)
    })
    .catch(err => callback(null, err))

}