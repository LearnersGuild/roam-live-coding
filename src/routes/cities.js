const express = require('express')
const getCityDataById = require('../actions/getCityDataById')

const cityRouter = express.Router()

cityRouter.get('/:id', (req, res) => {
  const { id } = req.params
  getCityDataById(id)
    .then(result => {
      if(result) {
        return res.json(result)
      } else {
        return res.status(404).json({ message: 'City not found' })
      }
    })
    .catch(console.error)
})

module.exports = cityRouter