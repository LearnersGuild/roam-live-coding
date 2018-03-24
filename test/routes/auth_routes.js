const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const { resetDb } = require('../utilities/db_reset')
const app = require('../../src')
const getUserByEmail = require('../../src/actions/getUserByEmail')

chai.use(chaiHttp)

describe('User Failure Route', () =>
  it('should response with a 404', () =>
    chai.request(app)
      .get('/users/2')
      .catch(err => expect(err.response).to.have.status(404))
  )
)

describe('/auth/sign-in', () => {
  beforeEach('reset db', () => {
    return resetDb()
  })
  it('returns jwt for user with good email/password', () => {
    return chai.request(app)
      .post('/auth/sign-in')
      .send({ email: 'test@test.test', password: 'test' })
      .then(response => {
        expect(response.body).to.have.property('token')
      })
  })
  it('returns 400 status for good email, bad password', () => {
    return chai.request(app)
      .post('/auth/sign-in')
      .send({ email: 'test@test.test', password: 'bad' })
      .catch(err => expect(err.response).to.have.status(401))
  })
  it('returns 400 status for bad email', () => {
    return chai.request(app)
      .post('/auth/sign-in')
      .send({ email: 'hpotter@gmail.com', password: 'hedwig4ever' })
      .catch(err => expect(err.response).to.have.status(401))
  })
})

describe('/auth/sign-up', () => {
  const hpEmail = 'hpotter@hogwarts.edu'
  const userObj = { email: hpEmail, password: 'dudleysux', primary_city: 'Hogsmeade', name: 'Harry Potter' }
  context('complete request', () => {
    let response
    before(() => {
      return resetDb().then(() => {
        return chai.request(app)
        .post('/auth/sign-up')
        .send(userObj)
        .then(signUpResponse => {
          response = signUpResponse
        })
      })
    })
    it('returns a token', () => {
      expect(response.body).to.have.property('token')
    })
    it('adds user to the db', () => {
      return getUserByEmail(hpEmail)
        .then(user => {
          expect(user).not.to.be.null
        })
    })
  })
  context('incomplete request', () => {
    it('returns a token if name is missing', () => {
      return resetDb().then(() => {
        return chai.request(app)
        .post('/auth/sign-up')
        .send(userObj)
        .then(response => {
          expect(response.body).to.have.property('token')
        })
      })
    })
    Array('email', 'password', 'primary_city').forEach((prop) => {
      const thisUser = Object.assign({}, userObj)
      delete thisUser[prop]
      it(`returns an error if ${prop} is missing`, () => {
        return resetDb().then(() => {
          return chai.request(app)
          .post('/auth/sign-up')
          .send(thisUser)
          .catch(error => {
            expect(error.response.status).to.equal(422)
          })
        })
      })
    })
    context('email exists in db', () => {
      it('returns a 422 status', () => {
        return resetDb().then(() => {
          return chai.request(app)
          .post('/auth/sign-up')
          .send({ email: 'test@test.test', password: 'test', primary_city: 'Oakland'})
          .catch(error => {
            expect(error.response.status).to.equal(422)
          })
        })
      })
    })
  })
})