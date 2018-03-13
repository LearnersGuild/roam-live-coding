const db = require('../db/db')
const getUserById = require('./getUserById')
const getPostsByUserId = require('./getPostsByUserId')

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
 * (or null if the user wasn't found)
 */
const getUserDataById = async id => {
  const userData = await getUserById(id)
  if (!userData) return null
  const posts = await getPostsByUserId(userData.id)
  return Object.assign(userData, { posts })
}

module.exports = getUserDataById