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

const comparePassword = function() {

}

module.exports = {
  encryptPassword,
  comparePassword,
}