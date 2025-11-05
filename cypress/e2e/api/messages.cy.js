/// <reference types="cypress" />
describe('Messages API shape (sample)', () => {
  it('GET returns an array-like shape (sample placeholder)', () => {
    cy.request('https://httpbin.org/anything/messages').then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('method', 'GET')
    })
  })
})
