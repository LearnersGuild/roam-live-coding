const db = require('../db/db')
const { comparePassword } = require('../utilities/password')

/**
 * Check to see whether email/password combo exists in db
 * @param {string} email - email of user to check
 * @param {string} password - password to check
 * @returns {promise} - Promise resolves to object representing user row
 */
const checkUserPassword = (email, password) => {
  return comparePassword()
}

module.exports = checkUserPassword