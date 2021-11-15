const express = require("express");
const cors = require("cors");
const config = require('./src/config/config');
const routes = require("./src/routes");

let app = express();
app.use('*', cors());


const PORT = (process.env.PORT || 5000);
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const router = express.Router();
app.use(router);
app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on: http://localhost:${PORT}/`);
});

routes(router);