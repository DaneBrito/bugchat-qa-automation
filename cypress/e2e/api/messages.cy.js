/// <reference types="cypress" />
describe('Messages API shape (sample)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/messages', {
      statusCode: 200,
      body: [{ id: 1, text: 'hello' }, { id: 2, text: 'world' }]
    }).as('msgs')
  })

  it('GET returns an array-like shape (sample placeholder)', () => {
    cy.request('/api/messages').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.be.an('array').and.have.length.greaterThan(0)
    })
  })
})
