/**
 * File containing express API server
 * @module
 */

const express = require('express')
const app = express()

app.listen(3030, () => {
  console.log('API server listening on port 3030')
})