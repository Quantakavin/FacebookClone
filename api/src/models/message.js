const connection = require('../config/database')

module.exports.insert = (user_id, conversation_id, content) => {
    const createMessageQuery = `INSERT INTO message (user_id, conversation_id, content, date) VALUES ($1, $2, $3, NOW() at time zone 'SGT')`
    return new Promise((resolve, reject) => {
        connection
            .query(createMessageQuery, [user_id, conversation_id, content])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.getAll = (conversation_id, user_id) => {
    const getMessagesQuery = `SELECT content, date, read, CASE WHEN user_id =$2 THEN true ELSE false END FROM Message where conversation_id = $1`
    return new Promise((resolve, reject) => {
        connection
            .query(getMessagesQuery, [conversation_id, user_id])
            .then((results) => {
                resolve(results)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}
