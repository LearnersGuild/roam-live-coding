/**
 * File containing express API server
 * @module
 */

const express = require('express')
const bodyParser = require('body-parser')
const cityRouter = require('./routes/cities')
const userRouter = require('./routes/users')
const app = express()

app.use(bodyParser.json())
app.use('/cities', cityRouter)
app.use('/users', userRouter)

app.listen(3030, () => {
  console.log('API server listening on port 3030')
})

module.exports = app