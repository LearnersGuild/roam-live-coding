const express = require('express')
const passport = require('passport')
const passportService = require('../services/passport')
const Authentication = require('../controllers/authentication')
const authRouter = express.Router()

/////////// sign in /////////////
// middleware for before signin route -- don't let them in unless they have
// a correct email / password
const requireSignin = passport.authenticate('local', { session: false })
authRouter.post('/sign-in', requireSignin, Authentication.signin)

/////////// sign-up /////////////
authRouter.post('/sign-up', Authentication.signup)

module.exports = authRouter