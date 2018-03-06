const db = require('../../db/db')

/**
 * Get all the tables in the current db connection.
 * @returns {Promise} - Promise resolving to array of objects each representing
 *  a table. Each object has a key 'table_name'.
 */
const getTables = function () {
  return db.query(
    `SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';`)
}

/**
 * Truncate all tables to reset the database.
 * @returns {Promise} - Promise whose resolution is unimportant.
 */
const clearDB = function () {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cowardly refusing to truncate production db.')
  }
  return getTables()
    .then(tables => {
      const table_queries = tables.map(table =>
        `TRUNCATE ${table.table_name} RESTART IDENTITY CASCADE`)
      return db.multi(table_queries.join(';'))
    })
    .catch(console.error)
}

/**
 * Seed database with initial data
 * @returns {promise} - Promise whose resolution is unimportant
 */
const seedDb = () => {
  // TODO: when I have a password encryption function, 
  // save encrypted password instead
  const password = 'plainText'
  const city = 'Oakland'
  const createUserQuery = `
  INSERT INTO users
    (name, email, password, primary_city)
  VALUES
    ($/name/, $/email/, $/password/, $/city/)
  RETURNING *
  `
  const userParams = { 
    name: 'Testy Test', 
    email: 'test@test.test',
    password,
    city
  }
  let userId, cityId
  return db.one(createUserQuery, userParams)
    .then(userResult => {
      userId = userResult.id
    })
    .then(db.one(createCityQuery, cityParams))
    .then(cityResult => {
      cityId = cityResult.id
      const postParams = {}
      return db.one(createPostQuery, postParams)
    })
    .then(postResult => {
      const commentParams = {}
      return db.one(createCommentQuery, commentParams)
    })
    .catch(error => {
      console.error(error)
      process.exit(1)
    })

}

const resetDb = () => {

}

module.exports = {
  resetDb,
}