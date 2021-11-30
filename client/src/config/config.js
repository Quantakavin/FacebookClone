var baseURL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseURL = process.env.REACT_APP_DEVELOPMENT_URL;
} else {
    baseURL = process.env.REACT_APP_PRODUCTION_URL;
}


module.exports = {
    "baseURL": baseURL
};
