const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const { resetDb } = require('../utilities/db_reset')
const addUser = require('../../src/actions/addUser')
const app = require('../../src')
const { generateToken } = require('../../src/controllers/authentication')
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
      .get(`/users/${this.createdUser.id}`)
      .then(user => (this.returnUser = user.body))
  )

  it('Should be the users name',  () =>
    expect(this.returnUser.name).to.be.eql(this.createdUser.name)
  )
})

describe('patch /users/:id', () => {
  context('no jwt', () => {
    before('Reset DB', () => {
      return resetDb()
    })
    it('returns status 401 for nonexistent user', () => {
      return chai.request(app)
        .patch('/users/23456')
        .send({ name: 'Bugs Bunny' })
        .catch(err => { 
          expect(err.response).to.have.status(401)
        })
    })  
    it('returns status 401 for existing user', () => {
      return chai.request(app)
        .patch('/users/1')
        .send({ name: 'Bugs Bunny' })
        .catch(err => { 
          expect(err.response).to.have.status(401)
        })    
    })
  })
  context('with jwt', () => {
    let token
    before('generate token for user ID 1', () =>  {
      token = generateToken({ id: 1 })
    })
    context('User does not exist (and does not match jwt)', () => {
      before('Reset DB and access route with nonexistent user', () => {
        return resetDb()
          .then(() => {
            return chai.request(app)
              .patch('/users/23456')
              .set('authorization', token)
              .send({ name: 'Bugs Bunny' })
          })
          .catch(err => { 
            this.errResponse = err.response 
          })
        })
      it('returns status 401', () => {
        expect(this.errResponse).to.have.status(401)
      })
      it('returns json with error message', () => {
        expect(this.errResponse.body.message).to.include('trying to update user')
      })
    })
    context('User does exist and matches jwt', () => {
      context('no data sent', () => {
        before('Reset DB and access route with existent user', () => {
          return resetDb()
            .then(() => {
              return chai.request(app)
                .patch('/users/1')
                .set('authorization', token)
                .send({})
            })
            .catch(err => { 
              this.errResponse = err.response 
            })
          })
        it('returns status 422', () => {
          expect(this.errResponse).to.have.status(422)
        })
        it('returns json with error message', () => {
          expect(this.errResponse.body.message).to.equal('No changes received')
        })
      })
      context('data sent', () => {
        const hpName = 'Harry Potter'
        const hpEmail = 'hpotter@ministryofmagic.gov.uk'
        before('Reset DB and access route with existent user and data', () => {
          return resetDb()
            .then(() => {
              return chai.request(app)
                .patch('/users/1')
                .set('authorization', token)
                .send({
                  name: hpName,
                  email: hpEmail,
                })
            })
            .then(response => {
              this.response = response
            })
          })
        it('returns response 200', () => {
          expect(this.response.status).to.equal(200)
        })
        it('returns result with updated name', () => {
          expect(this.response.body.name).to.equal(hpName)
        })
        it('returns result with updated email', () => {
          expect(this.response.body.email).to.equal(hpEmail)
        })
      })
    })
  })
})

