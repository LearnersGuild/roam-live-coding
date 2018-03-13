const express = require('express')
const getUserDataById = require('../actions/getUserDataById')

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

module.exports = userRouter