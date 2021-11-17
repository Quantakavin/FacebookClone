const connection = require('../config/database'); 

module.exports.insert = ( userid, friendid, callback) => {
    const sql = "INSERT INTO friendship (user_id, friend_id) VALUES ($1, $2) "
    connection.query(sql , [userid, friendid])
        .then(results => {
            callback(results, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })

}

module.exports.delete = (userid, friendid, callback) => {
    const sql = "DELETE FROM friendship WHERE (user_id = $1 AND friend_id=$2) OR (user_id = $2 AND friend_id=$1)"
    connection.query(sql , [userid, friendid])
        .then(result => {
            console.log(result)
            callback(result, null)
        })
        .catch(err => {
            console.log(err)
            callback(null, err)
        })
}