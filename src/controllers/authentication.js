/**
 * Express function meant to be used after passport middleware has
 * successfully passed local auth, to send jwt back to client
 * @param {object} req - request object
 * @param {object} res - response object
 */
const signin = (req, res) => {
  res.json({ message: 'you\'re in!' })
}

module.exports = {
  signin,
}