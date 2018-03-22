const { expect } = require('chai')
const { resetDb } = require('../utilities/db_reset')
const addUser = require('../../src/actions/addUser')
const getUserById = require('../../src/actions/getUserById')
const getUserByEmail = require('../../src/actions/getUserByEmail')
const getUserDataById = require('../../src/actions/getUserDataById')
const updateUserById = require('../../src/actions/updateUserById')
const checkUserLogin = require('../../src/actions/checkUserLogin')
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
  })
  it('return null when the user does not exist', () => {
    return getUserByEmail('fake@notanemail.doesntexist')
      .then(userRow => {
        expect(userRow).to.be.null
      })
  })
})

describe('getUserById', function() {
  let userRow
  context('user exists', () => {
    before('reset the database and retrieve existing user', () => {
      return resetDb()
        .then(() => getUserById(1))
        .then(result => userRow = result)
    })
    USER_PROPS.forEach(prop => {
        it(`returns an object with the '${prop}' property`, () => {
          expect(userRow).to.have.property(prop)
        })
  })
  it('return null when the user does not exist', () => {
    before('reset the db and run getUserDataById')
    return getUserById(2)
      .then(userRow => {
        expect(userRow).to.be.null
      })
    })
  })
})

describe('getUserDataById', function() {
  let userData
  const extraDataProps = ['posts']
  const fullUserProps = USER_PROPS.concat(extraDataProps)
  context('user exists', () => {
    before('reset the database and retrieve existing user', () => {
      return resetDb()
        .then(() => getUserDataById(1))
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
    return getUserDataById(2)
      .then(userData => {
        expect(userData).to.be.null
      })
  })
})

describe('updateUserById', function() {
  const oldData = {
    name: 'Testy Test', 
    email: 'test@test.test',
    primary_city: 'Oakland',
    image_url: ''
  }
  const newData = {
    name: 'Cheerful Test', 
    email: 'cheerful@test.test',
    primary_city: 'Berkeley',
    image_url: 'http://myuglyface.com'
  }
  describe('update column data one-by-one', () => {
    for (let prop in newData) {
      let newUserRow
      describe(`Updating ${prop}`, () => {
        before('update the column', () => {
          return resetDb()
            .then(() => {
              return updateUserById(1, { [prop]: newData[prop] })
            })
            .then(newUser => {
              newUserRow = newUser
          })
        })
        it(`updates the ${prop}`, () => {
          expect(newUserRow[prop]).to.equal(newData[prop])
        })
        for (let otherProp in newData) {
          // make sure none of the other properties changed
          if (otherProp !== prop) {
            it(`does NOT update the ${otherProp}`, () => {
              expect(newUserRow[otherProp]).to.equal(oldData[otherProp])
            })
          }
        }
      })
    }
  })
  describe('update all column data', () => {
    let newUserRow
    before('update all columns', () => {
      return resetDb()
      .then(() => {
        return updateUserById(1, newData)
      })
      .then(result => {
        newUserRow = result
      })
    })
    for (let prop in newData) {
      it(`updates the ${prop}`, () => {
        expect(newUserRow[prop]).to.equal(newData[prop])
      })
    }
  })
})

describe('checkUserLogin', () => {
  beforeEach('reset db', () => {
    return resetDb()
  })
  it('returns true for existing user with good password', () => {
    return checkUserLogin('test@test.test', 'test')
      .then(result => {
        expect(result).to.be.true
      })
  })
  it('return false for existing user with bad password', () => {
    return checkUserLogin('test@test.test', 'bad')
      .then(result => {
        expect(result).to.be.false
      })
  })
  it('returns null for nonexistent user', () => {
    return checkUserLogin('hpotter@ministryofmagic.gov', 'iheartginny')
      .then(result => {
        expect(result).to.be.null
      })
  })
})
