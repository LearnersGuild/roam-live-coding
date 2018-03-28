// TEST FILE

const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const { resetDb } = require('../utilities/db_reset')
const app = require('../../src')
const { generateToken } = require('../../src/controllers/authentication')
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

describe('patch /posts/:id', () => {
  it('returns 401 when not authenticated', () => {
    return resetDb()
      .then(() => {
        return chai.request(app)
        .patch('/posts/1')
        .send({ title: 'I <3 working at the ministry' })
      })
      .catch(err => {
        expect(err.response).to.have.status(401)
      })
  })
  context('authenticated (jwt exists)', () => {
    let token
    before('generate token for user ID 1', () =>  {
      token = generateToken({ id: 1 })
    })
    context('Post does not exist', () => {
      before('Reset DB and access route with nonexistent post', () => {
        return resetDb()
        .then(() => {
          return chai.request(app)
          .patch('/posts/23456')
          .set('authorization', token)
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
        expect(this.errResponse.body.message.length).not.to.equal(0)
      })
    })
    context('Post does exist', () => {
      context('no data sent', () => {
        before('Reset DB and access route with existent post', () => {
          return resetDb()
          .then(() => {
            return chai.request(app)
            .patch('/posts/1')
            .set('authorization', token)
            .send({ })
          })
          .catch(err => {
            this.errResponse = err.response
          })
        })
        it('returns status 422', () => {
          expect(this.errResponse).to.have.status(422)
        })
        it('returns json with error message', () => {
          expect(this.errResponse.body.message.length).not.to.equal(0)
        })
      })
      context('userId doesn\'t match post\'s userId', () => {
        before('reset DB and send request', () => {
          const badUserToken = generateToken({ id: 2 })
          return resetDb()
          .then(() => {
            return chai.request(app)
            .patch('/posts/1')
            .set('authorization', badUserToken)
            .send({ title: 'I <3 working at the ministry' })
          })
          .catch(err => {
            this.errResponse = err.response
          })
        })
        it('returns status 422', () => {
          expect(this.errResponse).to.have.status(422)
        })
        it('returns message about No post with that ID', () => {
          expect(this.errResponse.body.message.length).not.to.equal(0)
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
            .set('authorization', token)
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
})

describe('delete /posts/:id', () => {
  it('returns 401 when not authenticated', () => {
    return resetDb()
      .then(() => {
        return chai.request(app)
          .delete('/posts/1')
      })
      .catch(err => {
        expect(err.response).to.have.status(401)
      })
  })
  context('authenticated', () => {
    let token
    before('generate token for user ID 1', () =>  {
      token = generateToken({ id: 1 })
    })
    context('Post does not exist', () => {
      before('Reset DB and access route with nonexistent post', () => {
        return resetDb()
          .then(() => {
            return chai.request(app)
              .delete('/posts/23456')
              .set('authorization', token)
          })
          .catch(err => {
            this.errResponse = err.response
          })
        })
      it('returns status 422', () => {
        expect(this.errResponse).to.have.status(422)
      })
      it('returns json with error message', () => {
        expect(this.errResponse.body.message.length).not.to.equal(0)
      })
    })
    context('Post exists but for different user', () => {
      before('reset db and send request', () => {
        const badToken = generateToken({ id: 2 })
        return resetDb()
        .then(() => {
          return chai.request(app)
            .delete('/posts/1')
            .set('authorization', badToken)
        })
        .catch(err => {
          this.errResponse = err.response
        })
      })
      it('returns status 422', () => {
        expect(this.errResponse).to.have.status(422)
      })
      it('returns json with error message', () => {
        expect(this.errResponse.body.message.length).not.to.equal(0)
      })      
    })
    context('Post does exist', () => {
      before('Reset DB and access route with existent post', () => {
        return resetDb()
          .then(() => {
            return chai.request(app)
              .delete('/posts/1')
              .set('authorization', token)
          })
          .then(response => {
            this.response = response
          })
        })
      it('returns response 200', () => {
        expect(this.response.status).to.equal(200)
      })
    })
  })
})

describe('post /posts', () => {
  context('no jwt', () => {
    it('returns 401 error', () => {
      return chai.request(app)
        .post('/posts')
        .send({})
        .catch(err => {
          expect(err.response.status).to.equal(401)
      })
    })
  })
  context('jwt', () => {
    let token
    before('generate token for user ID 1', () =>  {
      token = generateToken({ id: 1 })
    })
    context('no data sent', () => {
      before('Reset DB and access route with existent post', () => {
        return resetDb()
          .then(() => {
            return chai.request(app)
              .post('/posts')
              .set('authorization', token)
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
        expect(this.errResponse.body.message.length).not.to.equal(0)
      })
    })
    context('data sent', () => {
      const user_id = 1
      const city_id = 1
      const title = 'I <3 working at the ministry'
      const body = 'Visit the ministry today!'
      before('Reset DB and access route with existent post and data', () => {
        return resetDb()
          .then(() => {
            return chai.request(app)
              .post('/posts')
              .set('authorization', token)
              .send( {city_id, title, body} )
          })
          .then(response => {
            this.response = response
          })
        })
      it('returns response 200', () => {
        expect(this.response.status).to.equal(200)
      })
      it('returns result with updated title', () => {
        expect(this.response.body.title).to.equal(title)
      })
      it('returns result with updated body', () => {
        expect(this.response.body.body).to.equal(body)
      })
      it('returns a valid id', () => {
        expect(this.response.body.id).to.be.a('Number')
      })
    })
  })
})
