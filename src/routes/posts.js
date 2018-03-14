const express = require('express')
const getPostDataById = require('../actions/getPostDataById')

const postRouter = express.Router()

postRouter.get('/:id', (req, res) => {
  const { id } = req.params
  getPostDataById(id)
    .then(result => {
      if(result) {
        return res.json(result)
      } else {
        return res.status(404).json({ message: 'post not found' })
      }
    })
    .catch(console.error)
})

module.exports = postRouter