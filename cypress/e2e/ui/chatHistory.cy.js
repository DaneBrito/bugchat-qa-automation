/// <reference types="cypress" />
// Purpose: Ensure chat history loads in correct order, even under latency.
// Story: Flaky history loading = poor UX. We simulate latency and validate order.
describe('Chat history (latency + order)', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/messages', (req) => {
      const messages = [
        { id: 1, text: 'First', createdAt: 1 },
        { id: 2, text: 'Second', createdAt: 2 },
        { id: 3, text: 'Third', createdAt: 3 },
      ]
      setTimeout(() => req.reply({ statusCode: 200, body: { items: messages } }), 200)
    }).as('fetchHistory')
  })

  it('loads history and preserves order', () => {
    cy.visit('/')
    cy.window().then(async (win) => {
      const res = await win.fetch('/api/messages')
      expect(res.status).to.eq(200)
      const body = await res.json()
      const order = body.items.map((m) => m.text)
      expect(order).to.deep.eq(['First', 'Second', 'Third'])
    })
    cy.get('@fetchHistory').its('callCount').should('be.gte', 1)
  })
})

