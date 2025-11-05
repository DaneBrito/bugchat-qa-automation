/// <reference types="cypress" />
describe('Users API shape (sample)', () => {
  it('GET returns metadata (sample placeholder)', () => {
    cy.request('https://httpbin.org/anything/users').then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('method', 'GET')
    })
  })
})
