var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/database');

var validator = require('validator');

module.exports.search =  async (name, callback) => {
    console.log(name);
    searchedName = '%' + name.toLowerCase() + '%';
    const searchquery = 'SELECT * FROM users where LOWER(name) LIKE $1'
    connection.query(searchquery, [searchedName])
    .then(result => {
        console.log(searchedName)
       // console.log(result.rows)
        callback(result.rows, null)
    })
    .catch(err => callback(null, err))

}