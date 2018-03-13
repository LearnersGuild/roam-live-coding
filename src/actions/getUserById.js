const db = require('../db/db')

/**
 * Get user table data for user given an email
 * @param {string} email - email of user for whom to get data
 * @returns {promise} - Promise resolving to an object representing a user row
 */
const getUserById = id => {
  const query = `
  SELECT * FROM users
  WHERE id=$1
  `
  return db.oneOrNone(query, [id])
}

module.exports = getUserById