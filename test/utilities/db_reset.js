const db = require('../../src/db/db')
const { encryptPassword } = require('../../src/utilities/password')

/*** globals for creating stuff */
const password = 'test'
const city = 'Oakland'
const image_url = ''
const createUserQuery = `
INSERT INTO users
  (name, email, password, primary_city, image_url)
VALUES
  ($/name/, $/email/, $/password/, $/city/, $/image_url/)
RETURNING *
`
const createCityQuery = `
INSERT INTO cities
  (name)
VALUES
  ($/city/)
RETURNING *
`
const createPostQuery = `
INSERT INTO posts
  (city_id, user_id, title, body)
VALUES
  ($/cityId/, $/userId/, $/title/, $/body/)
RETURNING *
`

const createCommentQuery = `
INSERT INTO comments
  (post_id, user_id, body)
VALUES
  ($/postId/, $/userId/, $/body/)
RETURNING *
`

const userParams = { 
  name: 'Testy Test', 
  email: 'test@test.test',
  city,
  image_url
}
/*** end: globals for creating stuff */

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
const clearDb = function () {
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

  let userId

  // create the whole first user with city, post, etc
  return encryptPassword(password)
    .then(hashedPassword => {
      userParams.password = hashedPassword
      return db.one(createUserQuery, userParams)
        .then(userResult => {
          userId = userResult.id
        })
      })
    .then(() => db.one(createCityQuery, { city }))
    .then(cityResult => {
      const postParams = {
        cityId: cityResult.id,
        userId,
        title: 'what a great city!',
        body: 'go there today!'
      }
      return db.one(createPostQuery, postParams)
    })
    .then(postResult => {
      const commentParams = {
        postId: postResult.id,
        userId,
        body: 'This comment sucks.'
      }
      return db.one(createCommentQuery, commentParams)
    })
    .then(() => {
      // add city WITHOUT posts, called 'no_post_city'
      return db.one(createCityQuery, {city: 'no_post_city'})
    })
    .catch(error => {
      console.error(error)
      process.exit(1)
    })

}

/**
 * Add a second user (with no posts, etc) for testing purposes
 * @returns {Promise} - Promise whose resolution is unimportant
 */
const addSecondUser = () => {
  // create dummy second user
  const userParams = { 
    name: 'Testy Test2', 
    email: 'test2@test.test',
    city,
    image_url,
  }
  return encryptPassword(password)
    .then(hashedPassword => {
      userParams.password = hashedPassword
      return db.one(createUserQuery, userParams)
  })
}

/**
 * Truncate all db tables and seed the db
 * @returns {promise} - promise whose resolution is unimportant
 */
const resetDb = () => {
  return clearDb().then(seedDb).then(addSecondUser)
}

module.exports = {
  resetDb,
}