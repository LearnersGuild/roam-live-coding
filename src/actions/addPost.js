const db = require('../db/db')
const { encryptPassword } = require('../utilities/password')

/**
 * Add a post to the database
 * 
 * @param {number} city_id 
 * @param {number} user_id 
 * @param {string} title 
 * @param {string} body 
 * @returns {promise} - Promise that resolves to an object 
 * representing the row added to the posts table.
 */
const addPost = function(city_id, user_id, title, body) {
  const query = `
    INSERT INTO posts
      (city_id, user_id, title, body)
    VALUES
      ($/city_id/, $/user_id/, $/title/, $/body/)
    RETURNING
      *
  `
  return db.one(query, { city_id, user_id, title, body })
}

module.exports = addPost