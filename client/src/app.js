const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../webpack.config.js')

const app = express()

const compiler = webpack(webpackConfig)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  // render the error page
  res.status(err.status || 500)
  res.json({error:err.stack})
})

module.exports = app
