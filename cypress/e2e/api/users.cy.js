/// <reference types="cypress" />
describe('Users API shape (sample)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/users', {
      statusCode: 200,
      body: { users: [{ id: 1, name: 'QA Dani' }] },
    }).as('getUsers')
  })

  it('GET returns metadata (sample placeholder)', () => {
    cy.request('/api/users')
      .its('body.users')
      .should((arr) => {
        expect(arr).to.be.an('array')
        expect(arr[0]).to.have.property('name')
      })
    cy.wait('@getUsers')
  })
})
