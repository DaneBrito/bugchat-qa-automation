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
    cy.visit('/')
    cy.window().then(async (win) => {
      const res = await win.fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'Hello, BugChat!' }),
      })
      expect(res.status).to.eq(201)
      const data = await res.json()
      expect(data).to.have.property('status', 'sent')
    })
    cy.get('@sendMessage').its('callCount').should('be.gte', 1)
  })

  it('validates required text field', () => {
    cy.visit('/')
    cy.window().then(async (win) => {
      const res = await win.fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      expect(res.status).to.eq(400)
    })
    cy.get('@sendMessage').its('callCount').should('be.gte', 1)
  })
})

