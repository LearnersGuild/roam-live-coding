const db = require('../db/db')

/**
 * Update a user in the database
 * 
 * @param {number} id - ID of user to update
 * @param {object} newData - possible keys: 
 *                              name
 *                              email
 *                              image_url
 *                              primary_city
 * @returns {promise} - Promise that resolves to an object 
 * representing the updated row in the users table.
 */
const updateUserById = function(id, newData) {
  let query = 'UPDATE users SET\n'
  const updates = []
  for (let column in newData) {
    updates.push(`${column} = \$/${column}/`)
  }
  query += updates.join(', ')
  query += `
    WHERE id = $/id/
    RETURNING *
  `
  return db.one(query, Object.assign(newData, {id}))
}

module.exports = updateUserById