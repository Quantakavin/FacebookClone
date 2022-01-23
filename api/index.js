const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const formData = require('express-form-data')
const routes = require('./src/routes')

const app = express()
app.use('*', cors())

const PORT = process.env.PORT || 5000

app.use(formData.parse({}))
app.use(formData.format())
app.use(formData.stream())
app.use(formData.union())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
app.use(router)

app.listen(PORT, (err) => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`)
    return console.log(`Server is Listening on: http://localhost:${PORT}/`)
})

routes(router)

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(404).send("Sorry can't find that!")
})
