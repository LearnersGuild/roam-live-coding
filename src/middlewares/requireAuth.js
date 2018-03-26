const passport = require('passport')

///////// middleware for protected route ///////////
// { session: false } means don't create a session, since we're using jwt, not cookies
const requireAuth = passport.authenticate('jwt', { session: false })

module.exports = requireAuth