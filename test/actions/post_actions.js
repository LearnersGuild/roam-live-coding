const { expect } = require('chai')
const { resetDb } = require('../utilities/db_reset')
const addPost = require('../../src/actions/addPost')
const getPostById = require('../../src/actions/getPostById')
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

describe('getPostById', function() {
  let postRow
  context('post exists', () => {
    before('reset the database and retrieve existing post', () => {
      return resetDb()
        .then(() => getPostById(1))
        .then(result => postRow = result)
    })
    POST_PROPS.forEach(prop => {
        it(`returns an object with the '${prop}' property`, () => {
          expect(postRow).to.have.property(prop)
        })
  })
  it('return null when the post does not exist', () => {
    before('reset the db and run getpostData')
    return getPostById(89720348590)
      .then(postRow => {
        expect(postRow).to.be.null
      })
    })
  })
})

// describe('getpostData', function() {
//   let postData
//   const extraDataProps = ['posts']
//   const fullpostProps = post_PROPS.concat(extraDataProps)
//   context('post exists', () => {
//     before('reset the database and retrieve existing post', () => {
//       return resetDb()
//         .then(() => getpostData('test@test.test'))
//         .then(result => postData = result)
//     })
//     fullpostProps.forEach(prop => {
//       it(`returns an object with the '${prop}' property`, () => {
//         expect(postData).to.have.property(prop)
//       })
//     })
//     extraDataProps.forEach(prop => {
//       it(`returns an array value for the ${prop} property`, () => {
//         expect(postData[prop]).to.be.an('array')
//       })
//       it(`returns an array of length 1 the ${prop} property`, () => {
//         expect(postData[prop]).to.have.length(1)
//       })
//     })
//   })
//   it('return null when the post does not exist', () => {
//     return getpostData('doesntexist@nowhere.com')
//       .then(postData => {
//         expect(postData).to.be.null
//       })
//   })
// })