const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const { resetDb } = require('../utilities/db_reset')
const addUser = require('../../src/actions/addUser')
const app = require('../../src')
// const { CITY_PROPS } = require('../utilities/properties')

const name = 'Lamar Schmo'
const email = 'lamar@schmo.com'
const password = 'i<3janeschmo'
const primary_city = 'schmotown'

chai.use(chaiHttp)

describe('User Failure Route', () =>
  it('should response with a 404', () =>
    chai.request(app)
      .get('/users/2')
      .catch(err => expect(err.response).to.have.status(404))
  )
)

describe('User Success Route', () => {
  before('Reset the DB and add user', () => resetDb()
    .then(() => addUser(name, email, password, primary_city))
    .then(user => (this.createdUser = user))
  )

  before('get user from route', () =>
    chai.request(app)
      .get('/users/2')
      .then(user => (this.returnUser = user.body))
  )

  it('Should be the users name',  () =>
    expect(this.returnUser.name).to.be.eql(this.createdUser.name)
  )
})

describe.only('PUT /users/:id', () => {
  context('User does not exist', () => {
    before('Reset DB and access route with nonexistent user', () => {
      return resetDb()
        .then(() => {
          chai.request(app)
            .put('/users/23456')
            .send({ name: 'Bugs Bunny' })
        })
        .then(response => {
          console.log('************ response:::', response)

        })
        .catch(err => { 
          console.log('************ err:::', err)
          this.errResponse = err.response 
        })
      })
    it('returns status 422', () => {
      expect(this.errResponse).to.have.status(422)
    })
    it('returns json with error message', () => {
      expect(this.errResponse.body.message).to.include('Invalid user ID')
    })
  })
})

