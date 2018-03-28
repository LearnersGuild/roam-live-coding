const db = require('../db/db')

/**
 * Delete a post with the given id
 * @param {number} id - id of post to delete
 * @param {number} userId - userId making the request
 * @returns {promise} - Promise that resolves to deleted id if id existed
 *          -> promise resolves to null if id does not exist
 */
const deletePostById = (id, userId) => {
  const query = `DELETE FROM posts WHERE id=$1 AND user_id=$2 RETURNING id`
  return db.oneOrNone(query, [id, userId])
}

module.exports = deletePostById