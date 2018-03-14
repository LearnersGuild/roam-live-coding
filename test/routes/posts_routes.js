// TEST FILE

const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const { resetDb } = require('../utilities/db_reset')
const app = require('../../src')
const { POST_PROPS } = require('../utilities/properties')

chai.use(chaiHttp)

describe.only('post routes', () => {
  before('reset and seed db', () => resetDb() )
  describe('/posts/:id', () => {
    let response
    describe('existing post', () => {
      before('load the route', () => {
        return chai.request(app)
          .get('/posts/1')
          .then(res => response = res)
      })
      it('returns status 200', () => {
        expect(response).to.have.status(200)
      })
      it('returns json', () => {
        expect(response).to.be.json
      })
      POST_PROPS.forEach(prop => {
        it(`returns JSON with the '${prop}' property`, () => {
          expect(response.body).to.have.property(prop)
        })
      })
    })
    describe('nonexistent post', () => {
      let response
      before('load the route', () => {
        return chai.request(app)
          .get('/posts/1353425')
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