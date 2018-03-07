// TEST FILE

const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const { resetDb } = require('../utilities/db_reset')
const app = require('../../src')
const { CITY_PROPS } = require('../utilities/properties')

chai.use(chaiHttp)

describe('city routes', () => {
  before('reset and seed db', () => resetDb() )
  describe('/cities/:id', () => {
    let response
    describe('existing city', () => {
      before('load the route', () => {
        return chai.request(app)
          .get('/cities/1')
          .then(res => response = res)
      })
      it('returns status 200', () => {
        expect(response).to.have.status(200)
      })
      it('returns json', () => {
        expect(response).to.be.json
      })
      CITY_PROPS.forEach(prop => {
        it(`returns JSON with the '${prop}' property`, () => {
          expect(response.body).to.have.property(prop)
        })
      })
    })
    describe('nonexistent city', () => {
      let response
      before('load the route', () => {
        return chai.request(app)
          .get('/cities/1353425')
          .catch(err => response = err.response)
      })
      it('returns status 404', () => {
        expect(response).to.have.status(404)
      })
      it('returns json with error message', () => {
        expect(response.body).to.have.property('message')
      })
    })
  })
})