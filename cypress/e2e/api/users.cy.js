/// <reference types="cypress" />
describe('Users API shape (sample)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/users', {
      statusCode: 200,
      body: { meta: { total: 3 }, items: [{id:1},{id:2},{id:3}] }
    }).as('users')
  })

  it('GET returns metadata (sample placeholder)', () => {
    cy.request('/api/users').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.have.property('meta')
    })
  })
})
