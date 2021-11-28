const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    database: process.env.DBNAME,
    JWTKey: process.env.JWTKEY
};
