let baseURL = process.env.REACT_APP_DEVELOPMENT_URL;

if (process.env.NODE_ENV == 'production') {
    baseURL = process.env.REACT_APP_PRODUCTION_URL;
}


module.exports = {
    baseURL: baseURL
};
