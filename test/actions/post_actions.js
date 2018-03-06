const { expect } = require('chai')
const { resetDb } = require('../utilities/db_reset')
const db = require('../../src/db/db')
const addPost = require('../../src/actions/addPost')
const getPostDataById = require('../../src/actions/getPostDataById')
const deletePostById = require('../../src/actions/deletePostById')
const updatePostById = require('../../src/actions/updatePostById')

const POST_PROPS = [
  'id',
  'city_id',
  'user_id',
  'title',
  'body',
  'created_at',
]

// describe('add new post', function() {
//   let newPost
//   const postData = {
//     'city_id': 1,
//     'user_id': 1,
//     'title': 'What a great city',
//     'body': 'I want to move here! live here! be here all the time!',
//   }

//   beforeEach('reset the db and add a post', () => {
//     return resetDb()
//     .then(() => addPost(postData.city_id, postData.user_id, postData.title, postData.body))
//     .then(post => { newPost = post })
//   })
//   it('creates a new postId', () => {
//     expect(newPost.id).to.be.a('number')
//   })
//   it('creates a new date for created_at', () => {
//     expect(newPost.created_at).to.be.a('date')
//   })
//   Array(
//     'city_id',
//     'user_id',
//     'title',
//     'body'
//   ).forEach(column => {
//     it(`adds the ${column} to the database`, () => {
//       expect(newPost[column]).to.equal(postData[column])
//     })
//   })
// })

// describe('getPostDataById', function() {
//   let postRow
//   context('post exists', () => {
//     before('reset the database and retrieve existing post', () => {
//       return resetDb()
//         .then(() => getPostDataById(1))
//         .then(result => postRow = result)
//     })
//     POST_PROPS.forEach(prop => {
//         it(`returns an object with the '${prop}' property`, () => {
//           expect(postRow).to.have.property(prop)
//         })
//   })
//   it('return null when the post does not exist', () => {
//     return getPostDataById(89720348590)
//       .then(postRow => {
//         expect(postRow).to.be.null
//       })
//     })
//   })
// })

// describe('deletePostById', function() {
//   let postCountBefore
//   const countQuery = 'SELECT COUNT(id) FROM posts'
//   beforeEach('reset and seed the db', () => {
//     return resetDb()
//       .then(() => db.one(countQuery))
//       .then(countResult => postCountBefore = countResult.count)
//   })
//   it('deletes the post from the database', () => {
//     return deletePostById(1)
//       .then(() => db.one(countQuery))
//       .then(countResult => {
//         expect(Number(countResult.count)).to.equal(postCountBefore - 1)
//       })
//     })
// })

describe('updatePostById', function() {
  const oldData = {
    title: 'what a great city!',
    body: 'go there today!'
  }
  const newData = {
    title: 'gooooooo Mira!',
    body: 'hooray for bodies!',
  }
  context('update column data one-by-one', () => {
    for (let prop in newData) {
      let newPostRow
      context(`Updating ${prop}`, () => {
        before('update the column', () => {
          return resetDb() 
            .then(() => {
              return updatePostById(1, { [prop]: newData[prop] })
            })
            .then(newPost => {
              newPostRow = newPost
          })
        })
        it(`updates the ${prop}`, () => {
          expect(newPostRow[prop]).to.equal(newData[prop])
        })
        for (let otherProp in newData) {
          // make sure none of the other properties changed
          if (otherProp !== prop) {
            it(`does NOT update the ${otherProp}`, () => {
              expect(newPostRow[otherProp]).to.equal(oldData[otherProp])
            })
          }
        }
      })
    }
  })
  describe('update all column data', () => {
    let newPostRow
    before('update all columns', () => {
      return resetDb()
        .then(() => {
          return updatePostById(1, newData)
        })
        .then(result => {
          newPostRow = result
        })
    })
    for (let prop in newData) {
      it(`updates the ${prop}`, () => {
        expect(newPostRow[prop]).to.equal(newData[prop])
      })
    }
  })
})
