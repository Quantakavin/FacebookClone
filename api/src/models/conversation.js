const connection = require('../config/database')

module.exports.insert = (sender_id, receiver_id) => {
    const createConversationQuery = `INSERT INTO conversation (sender_id, receiver_id) VALUES ($1, $2)`
    return new Promise((resolve, reject) => {
        connection
            .query(createConversationQuery, [sender_id, receiver_id])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.getAll = (user_id) => {
    const getConversationsQuery = `SELECT sender_id, receiver_id FROM conversation WHERE sender_id = $1 OR receiver_id = $1 `
    return new Promise((resolve, reject) => {
        connection
            .query(getConversationsQuery, [user_id])
            .then((results) => {
                resolve(results)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}
