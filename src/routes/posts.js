const express = require('express')
const getPostDataById = require('../actions/getPostDataById')
const updatePostById = require('../actions/updatePostById')
const deletePostById = require('../actions/deletePostById')
const addPost = require('../actions/addPost')
const requireAuth = require('../middlewares/requireAuth')

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

postRouter.patch('/:id', requireAuth, (req, res) => {
  // TODO: make sure the request is for the AUTHENTICATED user
  const { id } = req.params
  const userId = req.user.id
  const changes = req.body

  // TODO: allow user to update city
  if (!changes.title
      && !changes.body ) {
    // 422 status = invalid input
    return res.status(422).json({ message: 'No changes received' })
  }
  return updatePostById(id, userId, changes)
    .then(result => {
      if(result) {
        res.json(result)
      } else {
        // query returns empty if either post id or user_id fails to match, so not sure how to differentiate between those errors. 
        res.status(422).json({ message: `No post with that ID for authenticated user` })
      }
    })
    .catch(error => {
      res.status(400)
        .json({message: `Failed to update post: ${error.toString()}`})
    })
  })

postRouter.delete('/:id', requireAuth, (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  return deletePostById(id, userId)
    .then(result => {
      if(result) {
        res.json(result)
      } else {
        res.status(422).json({ message: `No post with that ID for the authenticated user` })
      }
    })
    .catch(error => {
      res.status(400)
        .json({message: `Failed to delete post: ${error.toString()}`})
    })
})

postRouter.post('/', requireAuth, (req, res) => {
  const user_id = req.user.id
  const { city_id, title, body } = req.body
  if (!city_id || !title || !body ) {
    return res.status(422).json({ message: 'Post must have a city_id, title AND body'})
  }
  return addPost(city_id, user_id, title, body)
    .then(result => {
      return res.json(result)
    })
    .catch(error => {
      res.status(400).json({ message: `Failed to add post: ${error.toString()}`})
    })
})

module.exports = postRouter
