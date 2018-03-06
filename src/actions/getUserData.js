const db = require('../db/db')
const getUserByEmail = require('./getUserByEmail')

/**
 * Get user table data, posts, and cities for user given an email
 * @param {string} email - email of user for whom to get data
 * @returns {promise} - promise resolving to object with keys:
 *    name
 *    id
 *    email
 *    primary_city
 *    image_url
 *    posts - value is array containing post data for user
 *    cities - value is array containing data for cities the user has posted about
 * (or null if the user wasn't found)
 */
const getUserData = (email) => {
  return Promise.resolve({})
  // return getUserByEmail(email)
  //   .then(userData => {
  //     if (!userData) {
  //       return null
  //     }

  //   })
}

module.exports = getUserData