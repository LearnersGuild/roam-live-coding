const { expect } = require('chai')
const { resetDb } = require('../utilities/db_reset')
const db = require('../../src/db/db')
const getCityDataById = require('../../src/actions/getCityDataById')
const getPostsByCityId = require('../../src/actions/getPostsByCityId')

const CITY_PROPS = [

]

describe.only('getPostsByCityId', () => {
  context('city exists in db with posts', () => {
    let cityPosts
    before('reset database', () => {
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