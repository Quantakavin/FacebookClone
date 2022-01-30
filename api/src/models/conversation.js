const connection = require('../config/database')

module.exports.insert = (sender_id, receiver_id) => {
    const createConversationQuery = `INSERT INTO conversation (sender_id, receiver_id) VALUES ($1, $2) returning id`
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
/*
module.exports.getAll = (user_id) => {
    const getConversationsQuery = `SELECT c.id AS ConversationID, c.sender_id, c.receiver_id, u.id AS UserID, u.name, u.picurl  FROM Users u INNER JOIN Conversation c ON (u.id = c.sender_id OR u.id = c.receiver_id) WHERE (c.sender_id = $1 OR c.receiver_id = $1) AND u.id != $1 `
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
*/

module.exports.getAll = (user_id) => {
    const getConversationsQuery = `SELECT DISTINCT ON (c.id) c.id AS ConversationID, 
    COUNT(case when m.read = false and m.user_id!=u.id and m.conversation_id = c.id then 1 else null end) OVER () AS total_count,
    c.sender_id, c.receiver_id, u.id AS UserID, u.name, u.picurl, m.content, m.date, m.id
    FROM Users u INNER JOIN Conversation c ON (u.id = c.sender_id OR u.id = c.receiver_id) 
    LEFT JOIN Message m ON (m.conversation_id = c.id)
    WHERE (c.sender_id = $1 OR c.receiver_id = $1) AND u.id != $1 ORDER BY c.id ASC, m.id DESC`
    return connection.query(getConversationsQuery, [user_id])
}

module.exports.get = (conversation_id, user_id) => {
    const getConversationsQuery = `SELECT c.id AS ConversationID,  u.name, u.picurl  FROM Users u INNER JOIN Conversation c ON (u.id = c.sender_id OR u.id = c.receiver_id) WHERE c.id = $1 AND u.id != $2 AND (c.sender_id=$2 OR c.receiver_id = $2)`
    return new Promise((resolve, reject) => {
        connection
            .query(getConversationsQuery, [conversation_id, user_id])
            .then((results) => {
                resolve(results)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.check = (sender_id, receiver_id) => {
    const checkConversationsQuery = `SELECT * FROM conversation WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) `
    return connection.query(checkConversationsQuery, [sender_id, receiver_id])
}