const express = require('express')
const getUserDataById = require('../actions/getUserDataById')
const updateUserById = require('../actions/updateUserById')

const userRouter = express.Router()


userRouter.get('/:id', (req, res) => {
  const { id } = req.params
  getUserDataById(id)
    .then(result => {
      if(result) {
        return res.json(result)
      } else {
        return res.status(404).json({ message: 'User not found' })
      }
    })
    .catch(console.error)
})

/*
  expected data in JSON format.
  Possible keys: 
    name
    email
    image_url
    primary_city
*/
userRouter.patch('/:id', (req, res) => {
  // TODO: make sure the request is for the AUTHENTICATED user
  const { id } = req.params
  const changes = req.body

  if (!changes.name 
      && !changes.email 
      && !changes.image_url 
      && !changes.primary_city) {
    // 422 status = invalid input
    return res.status(422).json({ message: 'No changes received' })
  }
  return updateUserById(id, changes)
    .then(result => {
      if(result) {
        res.json(result)
      } else {
        res.status(422).json({ message: `Invalid user ID: ${id}` })
      }
    })
    .catch(error => {
      res.status(400)
        .json({message: `Failed to update user: ${error.toString()}`})
    })

})

module.exports = userRouter