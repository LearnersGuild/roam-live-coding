const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const { resetDb } = require('../utilities/db_reset')
const app = require('../../src')

chai.use(chaiHttp)

describe('User Failure Route', () =>
  it('should response with a 404', () =>
    chai.request(app)
      .get('/users/2')
      .catch(err => expect(err.response).to.have.status(404))
  )
)

describe.only('/auth/sign-in', () => {
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
