const db = require('../db/db')

/**
 * Get data for user given an email
 * @param {string} email - email of user for whom to get data
 * @returns {promise} - Promise resolving to an object representing a user row
 */
const getUserByEmail = (email) => {
  const query = `
  SELECT * FROM users
  WHERE email=$1
  `
  return db.oneOrNone(query, [email])
}

module.exports = getUserByEmail
