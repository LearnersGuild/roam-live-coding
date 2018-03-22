const jwt = require('jwt-simple')

/**
 * Generate JSON web token for user
 * @param {object} user - user object with key 'id'
 */
function generateToken(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET)
}

/**
 * Express function meant to be used after passport middleware has
 * successfully passed local auth, to send jwt back to client
 * @param {object} req - request object
 * @param {object} res - response object
 */
const signin = (req, res) => {
  res.json({ token: generateToken(req.user) })
}

module.exports = {
  signin,
}