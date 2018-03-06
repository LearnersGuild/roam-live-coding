const { expect } = require('chai')
const { resetDb } = require('../utilities/db_reset')
const addUser = require('../../src/actions/addUser')
const getUserByEmail = require('../../src/actions/getUserByEmail')
const { encryptPassword, comparePassword } = require('../../src/utilities/password')

describe('add new user', function() {
  let newUser
  const name = 'Joe Schmo'
  const email = 'joe@schmo.com'
  const password = 'i<3janeschmo'
  const primary_city = 'schmotown'
  beforeEach(() => {
    return resetDb()
    .then(() => addUser(name, email, password, primary_city))
    .then(user => { newUser = user })
  })
  it('creates a new userId', () => {
    expect(newUser.id).to.be.a('number')
  })
  it('adds the name to the database', () => {
    expect(newUser.name).to.equal(name)
  })
  it('adds the correct encrypted password to the database', () => {
    return comparePassword(password, newUser.password)
      .then(result => expect(result).to.be.true)
  })
  it('adds the email to the database', () => {
    expect(newUser.email).to.equal(email)
  })
  it('adds the primary_city to the database', () => {
    expect(newUser.primary_city).to.equal(primary_city)
  })
})

describe('getUserByEmail', function() {
  beforeEach('reset the database', resetDb)
  it('returns an object with the expected properties when the user exists', () => {
    // TODO: object deep equal based on seed data
    getUserByEmail('test@test.test')
      .then(userRow => {
        expect(userRow).to.have.property('email')
          .and.to.have.property('password')
          .and.to.have.property('joined_at')
          .and.to.have.property('name')
          .and.to.have.property('id')
          .and.to.have.property('primary_city')
          .and.to.have.property('image_url')
      })
  })
  it('return null when the user does not exist', () => {
    return getUserByEmail('fake@notanemail.doesntexist')
      .then(userRow => {
        expect(userRow).to.be.null
      })
  })
})