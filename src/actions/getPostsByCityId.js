const db = require('../db/db')

/**
 * Get posts for a city
 * @param {number} cityId
 * @returns {promise} - Promise that resolves to array of objects, 
 *                      each having keys 'id', 'title', 'user_name'
 *                      (or an empty array if the cityId is not in the db,
 *                        or the city has no posts)
 */
module.exports = (cityId) => {
  const query = `
    SELECT p.id, p.title, u.name AS user_name, p.created_at
    FROM posts AS p
      JOIN users AS u
      ON p.user_id = u.id
    WHERE p.city_id = $1
  `
  return db.any(query, [cityId])
}