const db = require('../db/db')
const getUserByEmail = require('./getUserByEmail')
const { comparePassword } = require('../utilities/password')

/**
 * Check to see whether email/password combo exists in db
 * @param {string} email - email of user to check
 * @param {string} password - password to check
 * @returns {promise} - Promise resolving to user if user/password is correct, 
 *                      null if user was not in db or email/password is incorrect
 */
const checkUserPassword = (email, password) => {
  // get user from db by email
  return getUserByEmail(email)
    .then(user => {
      if (user) {
        return comparePassword(password, user.password)
          .then(result => {
            return result ? user : null
          })
        }
        return null
      })
}

module.exports = checkUserPassword