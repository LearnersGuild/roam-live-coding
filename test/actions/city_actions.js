const { expect } = require('chai')
const { resetDb } = require('../utilities/db_reset')
const getCityDataById = require('../../src/actions/getCityDataById')
const getPostsByCityId = require('../../src/actions/getPostsByCityId')

const CITY_PROPS = [

]

describe('getPostsByCityId', () => {
  context('city exists in db with posts', () => {
    before('reset database', () => resetDb())

  })
  context('city exists in db without posts', () => {
    before('reset database', () => resetDb())

  })
  context('city does not exist in db', () => {
    before('reset database', () => {
      return resetDb()
        .then(getPostsByCityId))
    it('should return null')
  })
})