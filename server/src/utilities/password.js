const bcrypt = require('bcryptjs')

/**
 * Create encrypted password
 * @param {string} password
 * @returns {promise} - Promise that resolves to encrypted version of password (string) 
 */
const encryptPassword = function(password) {
  return bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(password, salt)) 
    .catch(console.error)
}

/**
 * 
 * @param {string} rawPassword - password entered by user
 * @param {string} hashedPassword - password retrieved from database
 * @returns {promise} - Promise resolving to boolean (whether password matched)
 */
const comparePassword = function(rawPassword, hashedPassword) {
  return bcrypt.compare(rawPassword, hashedPassword)
}

module.exports = {
  encryptPassword,
  comparePassword,
}