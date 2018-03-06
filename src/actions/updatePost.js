const db = require('../db/db')

/**
 * Update a post in the database
 * 
 * @param {number} id - ID of post to update
 * @param {object} newData - keys: 'body' and/or 'title'
 * @returns {promise} - Promise that resolves to an object 
 * representing the row updated in the posts table.
 */
const updatePost = function(id, newData) {
  return Promise.resolve({})
//   const query = `
//     INSERT INTO posts
//       (city_id, user_id, title, body)
//     VALUES
//       ($/city_id/, $/user_id/, $/title/, $/body/)
//     RETURNING
//       *
//   `
//   return db.one(query, { city_id, user_id, title, body })
}

module.exports = updatePost