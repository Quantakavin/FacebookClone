var jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/database');

module.exports.insert = (name, email, password, callback) => {
    const insertUserQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;`;
    const values = [name, email, password];
    connection.query(insertUserQuery, values)
    .then(returnid => {
        callback(returnid, null)
    })
    .catch(err => callback(null, err))
}

module.exports.login = (email, callback) => {
    const loginUserQuery = `SELECT id, name, password FROM users WHERE email=$1`;
    connection.query(loginUserQuery, [email])
    .then(results=> {
        callback(null, results);
    })
    .catch(err => callback(err, null))
}
