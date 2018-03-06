const db = require('../db/db')

/**
 * Get posts for a user
 * @param {number} userId
 * @returns {promise} - Promise that resolves to array of objects, 
 *                      each having keys 'name', 'id' 
 */
module.exports = (userId) => {
  const query = `
    SELECT p.id, p.title, c.name AS city_name, p.created_at
    FROM posts AS p
      JOIN cities AS c
      ON p.city_id = c.id
    WHERE p.user_id = $1
  `
  return db.any(query, userId)
}