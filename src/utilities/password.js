const bcrypt = require('bcrypt')

/**
 * Create encrypted password
 * @param {string} password
 * @returns {promise} - Promise that resolves to encrypted version of password (string) 
 */
const encryptPassword = function(password) {
  return bcrypt.hash(password, 10)
}

const comparePassword = function() {

}

module.exports = {
  encryptPassword,
  comparePassword,
}