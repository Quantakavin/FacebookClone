const connection = require('../config/database')

module.exports.insert = (sender_id, receiver_id, content) => {
    const createMessageQuery = `INSERT INTO message (sender_id, receiver_id, content, date) VALUES ($1, $2, $3, NOW() at time zone 'SGT')`
    return new Promise((resolve, reject) => {
        connection
            .query(createMessageQuery, [sender_id, receiver_id, content])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.getAll = (sender_id, receiver_id) => {
    const getMessagesQuery = `SELECT * FROM message WHERE sender_id = $1 AND receiver_id = $2`
    return new Promise((resolve, reject) => {
        connection
            .query(getMessagesQuery, [sender_id, receiver_id])
            .then((results) => {
                resolve(results)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}
