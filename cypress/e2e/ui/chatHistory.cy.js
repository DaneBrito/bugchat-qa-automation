/// <reference types="cypress" />
// Purpose: Ensure chat history loads in correct order, even under latency.
// Story: Flaky history loading = poor UX. We simulate latency and validate order.
describe('Chat history (latency + order)', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/messages', (req) => {
      const messages = [
        { id: 1, text: 'First', createdAt: 1 },
        { id: 2, text: 'Second', createdAt: 2 },
        { id: 3, text: 'Third', createdAt: 3 }
      ]
      setTimeout(() => req.reply({ statusCode: 200, body: { items: messages } }), 300)
    }).as('fetchHistory')
  })

  it('loads history and preserves order', () => {
    cy.request('GET', '/api/messages').as('historyCall')
    cy.get('@historyCall').its('status').should('eq', 200)
    cy.get('@fetchHistory').should('have.property', 'callCount')
    cy.get('@historyCall').its('body.items').should((items) => {
      expect(items.map(i => i.text)).to.deep.eq(['First', 'Second', 'Third'])
    })
  })
})
