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

describe.only('User Success Route', () => {
  before('Before are test', () => resetDb()
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