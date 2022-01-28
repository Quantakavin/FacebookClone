const connection = require('../config/database')

module.exports.insert = async (userid, friendid, status) => {
    const sql =
        'INSERT INTO friendship (user_id, friend_id, status) VALUES ($1, $2, $3)'
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [userid, friendid, status])
            .then((results) => {
                resolve(results)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.delete = async (userid, friendid) => {
    const sql =
        'DELETE FROM friendship WHERE (user_id = $1 AND friend_id=$2) OR (user_id = $2 AND friend_id=$1)'
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [userid, friendid])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.get = async (userid, friendid) => {
    const sql =
        'SELECT * FROM friendship WHERE (user_id = $1 AND friend_id=$2) OR (user_id = $2 AND friend_id=$1)'
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [userid, friendid])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.getRequests = async (friend_id) => {
    const sql =
        `SELECT users.*, users.picurl, users.name, users.id FROM users INNER JOIN friendship ON users.id = friendship.user_id WHERE (friend_id = $1 AND status = 'requested')`
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [friend_id])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.acceptRequests = async (status, confirmed, friend_id, user_id) => {
    const sql =
        `UPDATE friendship SET status = $1, confirmed = $2 WHERE (friend_id = $3 AND user_id = $4 AND status = 'requested')`
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [status, confirmed, friend_id, user_id])
            .then((result) => {
                console.log(status)
                console.log(confirmed)
                console.log(friend_id)
                console.log(user_id)
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.declineRequests = async (status, confirmed, friend_id, user_id) => {
    const sql =
        `UPDATE friendship SET status = $1, confirmed = $2 WHERE (friend_id = $3 AND user_id = $4 AND status = 'requested')`
    return new Promise((resolve, reject) => {
        connection
            .query(sql, [status, confirmed, friend_id, user_id])
            .then((result) => {
                console.log(status)
                console.log(confirmed)
                console.log(friend_id)
                console.log(user_id)
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}
