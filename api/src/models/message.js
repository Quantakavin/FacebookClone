const connection = require('../config/database')

module.exports.insert = (user_id, conversation_id, content) => {
    const createMessageQuery = `INSERT INTO message (user_id, conversation_id, content, date) VALUES ($1, $2, $3, NOW() at time zone 'SGT')`
    return connection.query(createMessageQuery, [
        user_id,
        conversation_id,
        content
    ])
}

module.exports.getAll = (conversation_id, user_id) => {
    const getMessagesQuery = `SELECT content, date, read, CASE WHEN user_id =$2 THEN true ELSE false END FROM Message where conversation_id = $1`
    return connection.query(getMessagesQuery, [conversation_id, user_id])
}
module.exports.getUnread = (user_id) => {
    const getMessagesQuery = `SELECT Count(*) FROM message m INNER JOIN conversation c ON m.conversation_id  = c.id INNER JOIN users u ON (c.sender_id = u.id OR c.receiver_id = u.id) WHERE u.id = $1 AND m.user_id != $1 AND m.read = false`
    return connection.query(getMessagesQuery, [user_id])
}
module.exports.updateRead = (conversation_id, user_id) => {
    const getMessagesQuery = `UPDATE message SET read=true WHERE conversation_id = $1 and user_id != $2`
    return connection.query(getMessagesQuery, [conversation_id, user_id])
}
