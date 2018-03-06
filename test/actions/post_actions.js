const { expect } = require('chai')
const { resetDb } = require('../utilities/db_reset')
const addPost = require('../../src/actions/addPost')
// const getPostData = require('../../src/actions/getPostData')

const POST_PROPS = [
  'id',
  'city_id',
  'user_id',
  'title',
  'body',
  'created_at',
]

describe('add new post', function() {
  let newPost
  const postData = {
    'city_id': 1,
    'user_id': 1,
    'title': 'What a great city',
    'body': 'I want to move here! live here! be here all the time!',
  }

  beforeEach(() => {
    return resetDb()
    .then(() => addPost(postData.city_id, postData.user_id, postData.title, postData.body))
    .then(post => { newPost = post })
  })
  it('creates a new postId', () => {
    expect(newPost.id).to.be.a('number')
  })
  it('creates a new date for created_at', () => {
    expect(newPost.created_at).to.be.a('date')
  })
  Array(
    'city_id',
    'user_id',
    'title',
    'body'
  ).forEach(column => {
    it(`adds the ${column} to the database`, () => {
      expect(newPost[column]).to.equal(postData[column])
    })
  })
})

// describe('getUserByEmail', function() {
//   let userRow
//   context('user exists', () => {
//     before('reset the database and retrieve existing user', () => {
//       return resetDb()
//         .then(() => getUserByEmail('test@test.test'))
//         .then(result => userRow = result)
//     })
//     POST_PROPS.forEach(prop => {
//         it(`returns an object with the '${prop}' property`, () => {
//           expect(userRow).to.have.property(prop)
//         })
//   })
//   it('return null when the user does not exist', () => {
//     before('reset the db and run getUserData')
//     return getUserByEmail('doesntexist@nowhere.com')
//       .then(userRow => {
//         expect(userRow).to.be.null
//       })
//     })
//   })
// })

// describe('getUserData', function() {
//   let userData
//   const extraDataProps = ['posts']
//   const fullUserProps = USER_PROPS.concat(extraDataProps)
//   context('user exists', () => {
//     before('reset the database and retrieve existing user', () => {
//       return resetDb()
//         .then(() => getUserData('test@test.test'))
//         .then(result => userData = result)
//     })
//     fullUserProps.forEach(prop => {
//       it(`returns an object with the '${prop}' property`, () => {
//         expect(userData).to.have.property(prop)
//       })
//     })
//     extraDataProps.forEach(prop => {
//       it(`returns an array value for the ${prop} property`, () => {
//         expect(userData[prop]).to.be.an('array')
//       })
//       it(`returns an array of length 1 the ${prop} property`, () => {
//         expect(userData[prop]).to.have.length(1)
//       })
//     })
//   })
//   it('return null when the user does not exist', () => {
//     return getUserData('doesntexist@nowhere.com')
//       .then(userData => {
//         expect(userData).to.be.null
//       })
//   })
// })