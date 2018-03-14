// TEST FILE

const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const { resetDb } = require('../utilities/db_reset')
const app = require('../../src')
const { POST_PROPS } = require('../utilities/properties')

chai.use(chaiHttp)

describe('post routes', () => {
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

describe.only('patch /posts/:id', () => {
  context('Post does not exist', () => {
    before('Reset DB and access route with nonexistent post', () => {
      return resetDb()
        .then(() => {
          return chai.request(app)
            .patch('/posts/23456')
            .send({ title: 'I <3 working at the ministry' })
        })
        .catch(err => { 
          this.errResponse = err.response 
        })
      })
    it('returns status 422', () => {
      expect(this.errResponse).to.have.status(422)
    })
    it('returns json with error message', () => {
      expect(this.errResponse.body.message).to.include('Invalid post ID')
    })
  })
  context('Post does exist', () => {
    context('no data sent', () => {
      before('Reset DB and access route with existent post', () => {
        return resetDb()
          .then(() => {
            return chai.request(app)
              .patch('/posts/1')
              .send({})
          })
          .catch(err => { 
            this.errResponse = err.response 
          })
        })
      it('returns status 422', () => {
        expect(this.errResponse).to.have.status(422)
      })
      it('returns json with error message', () => {
        expect(this.errResponse.body.message).to.equal('No changes received')
      })
    })
    context('data sent', () => {
      const newTitle = 'I <3 working at the ministry'
      const newBody = 'Visit the ministry today!'
      before('Reset DB and access route with existent post and data', () => {
        return resetDb()
          .then(() => {
            return chai.request(app)
              .patch('/posts/1')
              .send({
                title: newTitle,
                body: newBody,
              })
          })
          .then(response => {
            this.response = response
          })
        })
      it('returns response 200', () => {
        expect(this.response.status).to.equal(200)
      })
      it('returns result with updated title', () => {
        expect(this.response.body.title).to.equal(newTitle)
      })
      it('returns result with updated body', () => {
        expect(this.response.body.body).to.equal(newBody)
      })
    })
  })
})
