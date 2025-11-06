/// <reference types="cypress" />
describe('API health', () => {
  beforeEach(() => {
    // Mocks the "health" response
    cy.intercept('GET', '**/api/health', {
      statusCode: 200,
      body: { slideshow: { title: 'BugChat Health OK' } },
    }).as('health')
  })

  it('http health returns 200', () => {
    cy.request('/api/health').its('status').should('eq', 200)
    cy.wait('@health')
  })

  it('json payload has slideshow key', () => {
    cy.request('/api/health').its('body').should('have.property', 'slideshow')
    cy.wait('@health')
  })
})
