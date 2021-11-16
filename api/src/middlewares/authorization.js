const config = require('../config/config');
const jwt = require('jsonwebtoken');

var authorization = {
verifyUser: (req, res, next) => {
        if (typeof req.headers.authorization !== "undefined") { 
            let token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, config.JWTKey, (err, data) => {
                console.log('data extracted from token \n',data);
                if (err) {
                    console.log(err);
                    return res.status(401).json({ message: 'You do not have access' });
                }
                else {
                    req.body.userid = data.id;
                    next();
                }
            })
  
      }else{
        res.status(401).send({ message: 'Please login first' });
      } 
    } 
}

    
    module.exports = authorization;
   