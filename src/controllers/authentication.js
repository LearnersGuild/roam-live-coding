const jwt = require('jwt-simple')
const getUserByEmail = require('../actions/getUserByEmail')
const addUser = require('../actions/addUser')

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

/**
 * Express function meant to be used to handle sign-up post request
 * @param {object} req - request object
 * @param {object} res - response object
 */
const signup = (req, res) => {

  const { name, email, password, primary_city } = req.body

  // make sure email and password aren't empty
  if (!email || !password || !primary_city) {
    return res.status(422).json({ message: 'email, password, and primary city must not be blank' })
  }

  // make sure email isn't in db
  return getUserByEmail(email)
    .then(user => {
      if (user) {
        return res.status(422).json({ message: 'email already exists' })
      }
      // add the user to the db
      return addUser(name || '', email, password, primary_city)
        .then(response => {
          res.json({ token: generateToken(response) })
        })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json({ message: 'Error: ' + err.toString() })
    })
}

module.exports = {
  signin,
  signup,
  generateToken,
}