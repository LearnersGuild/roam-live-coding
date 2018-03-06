const { expect } = require('chai')
const { resetDb } = require('../utilities/db_reset')
const addUser = require('../../src/actions/addUser')
const getUserByEmail = require('../../src/actions/getUserByEmail')
const getUserData = require('../../src/actions/getUserData')
const { encryptPassword, comparePassword } = require('../../src/utilities/password')

const USER_PROPS = [
  'email', 
  'password',
  'joined_at',
  'image_url',
  'primary_city',
  'id'
]

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
  let userRow
  context('user exists', () => {
    before('reset the database and retrieve existing user', () => {
      return resetDb()
        .then(() => getUserByEmail('test@test.test'))
        .then(result => userRow = result)
    })
    USER_PROPS.forEach(prop => {
        it(`returns an object with the '${prop}' property`, () => {
          expect(userRow).to.have.property(prop)
        })
  })
  it('return null when the user does not exist', () => {
    before('reset the db and run getUserData')
    return getUserByEmail('doesntexist@nowhere.com')
      .then(userRow => {
        expect(userRow).to.be.null
      })
    })
  })
})

describe('getUserData', function() {
  let userData
  const extraDataProps = ['cities', 'posts']
  const fullUserProps = USER_PROPS.concat(extraDataProps)
  context('user exists', () => {
    before('reset the database and retrieve existing user', () => {
      return resetDb()
        .then(() => getUserData('test@test.test'))
        .then(result => userData = result)
    })
    fullUserProps.forEach(prop => {
      it(`returns an object with the '${prop}' property`, () => {
        expect(userData).to.have.property(prop)
      })
    })
    extraDataProps.forEach(prop => {
      it(`returns an array value for the ${prop} property`, () => {
        expect(userData[prop]).to.be.an('array')
      })
      it(`returns an array of length 1 the ${prop} property`, () => {
        expect(userData[prop]).to.have.length(1)
      })
    })
  })
  it('return null when the user does not exist', () => {
    return getUserData('doesntexist@nowhere.com')
      .then(userData => {
        expect(userData).to.be.null
      })
  })
})