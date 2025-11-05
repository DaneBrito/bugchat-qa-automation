/// <reference types="cypress" />
describe('API health', () => {
  it('httpbin returns 200', () => {
    cy.request('https://httpbin.org/status/200').its('status').should('eq', 200)
  })
  it('json payload has slideshow key', () => {
    cy.request('https://httpbin.org/json').then((res) => {
      expect(res.status).to.eq(200)
      expect(res.headers['content-type']).to.include('application/json')
      expect(res.body).to.have.property('slideshow')
    })
  })
})
