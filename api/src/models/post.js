const connection = require('../config/database'); 

module.exports.insert = (content, callback) => {
    const insertPostQuery = `INSERT INTO post (type, user_id, content) VALUES ("text", 2, $1) RETURNING id;`;
    connection.query(insertPostQuery, content)
    .then(returnid => {
        callback(returnid, null)
    })
    .catch(err => callback(null, err))
}