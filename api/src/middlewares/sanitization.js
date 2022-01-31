const validator = require('validator')

const sanitization = {

    sanitizeResult: function (req, res, next) {
        for (i=0; i< result.length;i++) {
            var row = result[i];
            console.log(row);
            for (var key in row) {
                val = row[key];
                if (typeof val === "string") {
                    row[key] = validator.blacklist(val, '\<|\>|\'|\"|\&');
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
