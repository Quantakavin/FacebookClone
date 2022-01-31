const connection = require('../config/database')

module.exports.search = async () => {
    const searchquery = 'SELECT * FROM users'
    return connection.query(searchquery)
}
