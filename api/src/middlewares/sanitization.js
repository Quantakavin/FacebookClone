const validator = require('validator')

const sanitization = {
    sanitizeResult(req, res, next) {
        for (i = 0; i < res.length; i++) {
            const row = res[i]
            console.log(row)
            for (const key in row) {
                val = row[key]
                if (typeof val === 'string') {
                    row[key] = validator.blacklist(val, '<|>|\'|"|&')
                    res.status(400).json({
                        message: 'Malicious Data Detected'
                    })
                }
            }
        }
        next()
    }
}

module.exports = sanitization
