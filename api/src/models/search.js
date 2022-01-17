var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/database');

var validator = require('validator');

module.exports.search =  async (callback) => {
    const searchquery = 'SELECT * FROM users'
    connection.query(searchquery)
    .then(result => {
        callback(result.rows, null)
    })
    .catch(err => callback(null, err))

}