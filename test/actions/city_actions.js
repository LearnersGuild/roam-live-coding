const { expect } = require('chai')
const { resetDb } = require('../utilities/db_reset')
const db = require('../../src/db/db')
const getCityDataById = require('../../src/actions/getCityDataById')
const getPostsByCityId = require('../../src/actions/getPostsByCityId')
const { CITY_PROPS } = require('../utilities/properties')

describe('getCityDataById', () => {
  context('city exists in the db', () => {
    let cityData
    before('reset the db and get city data', () => {
      return resetDb()
        .then(() => db.one(`SELECT id FROM cities WHERE name=$1`, ['Oakland']))
        .then(result => getCityDataById(result.id))
        .then(data => cityData = data)
      })
    CITY_PROPS.forEach((prop) => {
      it(`contains the ${prop} property`, () => {
        expect(cityData).to.have.property(prop)
      })
    })
  })
  it('should return null when city does not exist in db', () => {
    return resetDb()
      .then(() => getCityDataById(12346734))
      .then(result => expect(result).to.be.null)
  })
})

describe('getPostsByCityId', () => {
  context('city exists in db with posts', () => {
    let cityPosts
    before('reset database and get posts', () => {
      return resetDb()
      .then(() => db.one(`SELECT id FROM cities WHERE name=$1`, ['Oakland']))
      .then(result => getPostsByCityId(result.id))
      .then(posts => cityPosts = posts)
    })
    Array('id', 'title', 'user_name')
      .forEach((prop) => {
        it(`contains the ${prop} property`, () => {
          expect(cityPosts[0]).to.have.property(prop)
        })
      })
    })
  it('should return an empty array when city exists in db without posts', () => {
    return resetDb()
      .then(() => db.one(`SELECT id FROM cities WHERE name=$1`, ['no_post_city']))
      .then(result => getPostsByCityId(result.id))
      .then(posts => expect(posts).to.eql([]))
  })
  it('should return an empty array when the city isn\'t in the db', () => {
    return resetDb()
    .then(() => getPostsByCityId(123456789))
    .then(result => expect(result).to.eql([])) 
  })
})