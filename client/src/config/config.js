const dotenv = require('dotenv')
dotenv.config()

let baseURL;
let serverURL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseURL = process.env.REACT_APP_DEVELOPMENT_URL;
    serverURL = process.env.REACT_APP_SERVER_DEVELOPMENT_URL;
} else {
    baseURL = process.env.REACT_APP_PRODUCTION_URL;
    serverURL = process.env.REACT_APP_SERVER_PRODUCTION_URL;
}


module.exports = {
    serverURL: serverURL,
    baseURL: baseURL
}; 

