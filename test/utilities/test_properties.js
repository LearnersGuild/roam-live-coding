const { expect } = require('chai')

/**
 * 
 * @param {object} resultObject - result object to check for properties
 * @param {array} properties - properties we expect the object to have
 * @returns {undefined} - nothing to return
 */
const testProperties = (resultObject, properties) => {
  properties.forEach(prop => {
    it(`returns an object with the '${prop}' property`, () => {
      expect(resultObject).to.have.property(prop)
    })
  })
}

module.exports = {
  testProperties
}