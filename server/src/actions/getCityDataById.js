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
const getCityDataById = async (id) => {
  const cityData = await db.oneOrNone(`SELECT * FROM cities WHERE id=$1`, [id])
  if (!cityData) return null
  const posts = await getPostsByCityId(cityData.id)
  return Object.assign(cityData, { posts })
}

module.exports = getCityDataById