const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')
const checkUserLogin = require('../actions/checkUserLogin')
const getUserById = require('../actions/getUserById')

/**
 * Function meant to be used as passport strategy callback for the localStrategy
 * @param {string} email 
 * @param {string} password 
 * @param {function} done 
 * @returns {promise} - Promise whose resolution is unimportant
 */
const checkPassword = function(email, password, done) {
  return checkUserLogin(email, password)
    .then((foundUser) => {
      if (!foundUser) {
        // user not in db or password doesn't match
        return done(null, false)
      }
      // otherwise, all's rosy
      done(null, foundUser)
    })
    .catch(done)
}

// create Local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, checkPassword)

// Set up options for JWT Strategy
const jwtOptions = {
  // tell it where to find the jwt payload
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),

  // how to decode
  secretOrKey: process.env.SECRET,
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // payload is the jwt object, which we defined with 'sub' and 'iat' properties

  // see if the userId in the payload exists in db. If it does, call done with that user.
  // otherwise, call done without a user object
  return getUserById(payload.sub.id)
    .then(user => {
      user = user || false // translate "null" response into "false"
      done(null, user)
    })
    .catch((err) => done(err, false))
})


passport.use(localLogin)
passport.use(jwtLogin)