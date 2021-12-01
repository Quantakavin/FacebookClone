const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    database: process.env.DBNAME,
    JWTKey: "k4wqvRueEtzmH7cJ4YXstj8LnLHcoVBc"
};
