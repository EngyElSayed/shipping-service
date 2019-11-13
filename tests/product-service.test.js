// // tests/product-service.test.js
// var productService = require('../src/services/product-service')

// describe('Product service', function () {

//   it('Should call http endpoint', async function () {
//     let weight = await productService.getProductWeight('13')
//     expect(weight).toBe(15.5)
//   })
// })


/**
* @jest-environment node
*/
var productService = require('../src/services/product-service')
var nock = require('nock')

describe('Product service', function () {
  it('Should handle unexpected response structure', async function () {
  nock('https://product.service:8899/products')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/19')
      .reply(200, {
        res: 15.5
      })

  await productService
      .getProductWeight('19')
      .then(() => {
        throw(new Error('Should not resolve in case of malformed data'))
      })
      .catch(err => {
        expect(err.message).toBe('Invalid response object')
      })
  })
})