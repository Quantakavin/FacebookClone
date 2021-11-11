var jwt = require('jsonwebtoken');
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

module.exports.login = () => {

}

module.exports.getUserByID = ( gottenID, callback) => {
    const sql = "SELECT * FROM users where id = $1 "
    // const privacy = getterID == gottenID ? ";" : "AND privacy = true;"
    connection.query(sql , [gottenID])
        .then(result => {
            console.log(result.rows[0])
            callback(result.rows[0], null)
        })
        .catch(err => callback(null, err))

}