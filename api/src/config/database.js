const { Pool, Client } = require('pg')
const config = require('./config');

const connectionString = "postgres://jquycoxe:***@fanny.db.elephantsql.com/jquycoxe";

const pool = new Pool({
  connectionString,
})


/*
const pool = new Pool({
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mydb',
    password: 'secretpassword',
    port: 3211,
  })
*/

  module.exports = pool;