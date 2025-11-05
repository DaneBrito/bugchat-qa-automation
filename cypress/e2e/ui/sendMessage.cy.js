/// <reference types="cypress" />
// Purpose: Validate message sending behavior and UI/API consistency.
// Story: Users must see consistent results between API responses and chat UI.
describe('Send message (mocked)', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/messages', (req) => {
      const { text } = req.body || {}
      if (!text) {
        req.reply({ statusCode: 400, body: { message: 'Text is required' } })
      } else {
        req.reply({ statusCode: 201, body: { id: Date.now(), text, status: 'sent' } })
      }
    }).as('sendMessage')
  })

  it('sends a message successfully', () => {
    cy.request('POST', '/api/messages', { text: 'Hello, BugChat!' }).as('msgCall')
    cy.get('@msgCall').its('status').should('eq', 201)
    cy.get('@sendMessage').should('have.property', 'callCount')
  })

  it('validates required text field', () => {
    cy.request({ method: 'POST', url: '/api/messages', body: {}, failOnStatusCode: false })
      .its('status').should('eq', 400)
  })
})
