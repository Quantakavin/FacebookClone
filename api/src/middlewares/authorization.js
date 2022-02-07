const jwt = require('jsonwebtoken')
const config = require('../config/config')

const authorization = {
    verifyUser: (req, res, next) => {
        if (typeof req.headers.authorization !== 'undefined') {
            const token = req.headers.authorization.split(' ')[1]

            jwt.verify(token, config.JWTKey, (err, data) => {
                console.log('data extracted from token \n', data)
                if (err) {
                    console.log(err)
                    res.status(401).json({ message: 'You do not have access' })
                } else {
                    req.body.userid = data.id
                    next()
                }
            })
        } else {
            console.log(`Header: ${req.body}`)
            res.status(401).send({ message: 'Please login first' })
        }
    }
}

module.exports = authorization
