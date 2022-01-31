const validator = require('validator')

const sanitization = {

    sanitizeResult: function (result) {
        //Sanitize each record’s values from the database result

        for (i = 0; i < result.length; i++) {
            var row = result[i];
            console.log(row);
            for (var key in row) {
                val = row[key];
                if (typeof val === "string") {
                    row[key] = validator.blacklist(val, '\<|\>|\'|\"|\&');
                    res.status(400).json({
                        message: 'Malicious data detected'
                    })
                }

            }
        }
    }

}

module.exports = sanitization