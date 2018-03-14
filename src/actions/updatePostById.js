const db = require('../db/db')

/**
 * Update a post in the database
 * 
 * @param {number} id - ID of post to update
 * @param {object} newData - keys: 'body' and/or 'title'
 * @returns {promise} - Promise that resolves to an object 
 * representing the updated row in the posts table.
 *   -> Resolve to null if id doesn't exist in db.
 */
const updatePostById = function(id, newData) {
  let query = 'UPDATE posts SET\n'
  const updates = []
  for (let column in newData) {
    updates.push(`${column} = \$/${column}/`)
  }
  query += updates.join(', ')
  query += `
    WHERE id = $/id/
    RETURNING *
  `
  return db.oneOrNone(query, Object.assign(newData, {id}))
}

module.exports = updatePostById