const db = require('../db/db')
const getUserByEmail = require('./getUserByEmail')
const { comparePassword } = require('../utilities/password')

/**
 * Check to see whether email/password combo exists in db
 * @param {string} email - email of user to check
 * @param {string} password - password to check
 * @returns {promise} - Promise resolves to object representing user row
 */
const checkUserPassword = (email, password) => {
  // get user from db by email
  return getUserByEmail(email)
    .then(user => {
      if (!user) {
        return null
      }
      // compare input password with hashed password in db
      return comparePassword(password, user.password)
    })
}

module.exports = checkUserPassword