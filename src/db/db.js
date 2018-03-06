const pgp = require('pg-promise')

const connectionString = 
  process.env.NODE_ENV === 'test' 
    ? process.env.TEST_DB_URL
    : process.env.DB_URL
const db = pgp(connectionString)

module.exports = db