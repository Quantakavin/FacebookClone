var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/database');
module.exports.insert = (name, email, password, callback) => {
    const insertUserQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`;
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
module.exports.updateUser = ( userid, newName, newEmail, password, privacy, bio, profilePic, coverPic ) =>{
    //sql to get their old info.
    //if they dont put new info for specific attributes, set new attributes to be old attributes
    //update
}

/*
module.exports.getAll = (userid, callback) => {
    const sql = "SELECT * FROM users where id != $1 "
    connection.query(sql , [userid])
    .then(results => {
        callback(results.rows, null)
    })
    .catch(err => callback(null, err))
}

*/
module.exports.getAll = (userid, callback) => {
    const sql = "SELECT * FROM users where id != $1 "
    // const privacy = getterID == gottenID ? ";" : "AND privacy = true;"
    connection.query(sql , [userid])
        .then(result => { 
            let counter = 0;

            for (let i=0; i< result.rows.length;i++) {
                let sql2 = "SELECT * FROM friendship WHERE (user_id = $1 AND friend_id=$2) OR (user_id = $2 AND friend_id=$1)"

                connection.query(sql2 , [userid, result.rows[i].id])  
                .then(result2 => {
                    counter ++;
                    if (result2.rows.length == 0) {
                        result.rows[i].friended = false;
                    } else {
                        result.rows[i].friended = true;
                    }
                    if (counter == (result.rows.length)) {
                        callback(result.rows, null)
                    }  
                }
                )
                .catch(error => {
                    console.log(error)
                    callback(null, error)
                })     
            }
        })
}
