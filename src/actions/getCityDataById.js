const db = require('../db/db')
const getPostsByCityId = require('./getPostsByCityId')

/**
 * Get city table data and posts for a city given an id
 * @param {number} id - id of the city for which to get data
 * @returns {promise} - promise resolving to object with keys:
 *    id
 *    name
 *    latitude
 *    longitude
 *    image_url
 *    description
 *    posts - value is array containing post data for city
 * (or null if the city wasn't found)
 */
const getCityById = async (id) => {
  return Promise.resolve({})
  // const userData = await getUserByEmail(email)
  // if (!userData) return null
  // const posts = await getPostsByUserId(userData.id)
  // return Object.assign(userData, { posts })
}

module.exports = getCityById