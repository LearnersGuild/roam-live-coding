const db = require('../db/db')

/**
 * Delete a post with the given id
 * @param {number} id 
 * @returns {promise} - Promise whose resolution is unimportant
 */
const deletePostById = (id) => {
  const query = `DELETE FROM posts WHERE id=$1`
  return db.none(query, [id])
}

module.exports = deletePostById