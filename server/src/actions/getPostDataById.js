const db = require('../db/db')

/**
 * Get post table data for post given an id
 * @param {number} id - id of post for which to get data
 * @returns {promise} - Promise resolving to an object representing a post row
 */
const getPostDataById = (id) => {
  const query = `
    SELECT * FROM posts
    WHERE id = $1
  `
  return db.oneOrNone(query, [id])
}

module.exports = getPostDataById