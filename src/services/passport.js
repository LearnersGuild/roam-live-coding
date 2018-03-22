const passport = require('passport')
const LocalStrategy = require('passport-local')
const checkUserLogin = require('../actions/checkUserLogin')

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

passport.use(localLogin)