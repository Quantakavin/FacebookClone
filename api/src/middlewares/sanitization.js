const validator = require('validator')

const sanitization = {
    sanitizeResult(req, res, next) {
        // Sanitize each record’s values from the database result

        next()
    }
}

module.exports = sanitization
