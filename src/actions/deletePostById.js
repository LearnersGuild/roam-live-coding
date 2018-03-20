const db = require('../db/db')

/**
 * Delete a post with the given id
 * @param {number} id 
 * @returns {promise} - Promise that resolves to deleted id if id existed
 *          -> promise resolves to null if id does not exist
 */
const deletePostById = (id) => {
  const query = `DELETE FROM posts WHERE id=$1 RETURNING id`
  return db.oneOrNone(query, [id])
}

module.exports = deletePostById