const express = require('express')
const getPostDataById = require('../actions/getPostDataById')
const updatePostById = require('../actions/updatePostById')

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

postRouter.patch('/:id', (req, res) => {
  // TODO: make sure the request is for the AUTHENTICATED user
  const { id } = req.params
  const changes = req.body

  // TODO: allow user to update city
  if (!changes.title 
      && !changes.body ) {
    // 422 status = invalid input
    return res.status(422).json({ message: 'No changes received' })
  }
  return updatePostById(id, changes)
    .then(result => {
      if(result) {
        res.json(result)
      } else {
        res.status(422).json({ message: `Invalid post ID: ${id}` })
      }
    })
    .catch(error => {
      res.status(400)
        .json({message: `Failed to update post: ${error.toString()}`})
    })
  })
  
module.exports = postRouter