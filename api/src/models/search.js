var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/database');

var validator = require('validator');

module.exports.search =  async () => {
    const searchquery = 'SELECT * FROM users'
    return new Promise((resolve, reject) => {
        connection.query(searchquery)
        .then(result => {
            resolve(result.rows)
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })
}