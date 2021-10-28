const express = require("express");
const ApiRouter = require('./routers/api');
const app = express();

app.use(express.json());
app.use('/api', ApiRouter);

app.listen(8000, () => {
    console.log("Backend is running")
})