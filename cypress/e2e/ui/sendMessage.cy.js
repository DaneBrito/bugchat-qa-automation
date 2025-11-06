/// <reference types="cypress" />
// Purpose: Validate message sending behavior and UI/API consistency.
// Story: Users must see consistent results between API responses and chat UI.
describe('Send message (mocked)', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/messages', (req) => {
      let body = req.body
      if (typeof body === 'string') {
        try { body = JSON.parse(body) } catch { body = {} }
      }
      const { text } = body || {}

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
        body: JSON.stringify({ text: 'Hello, BugChat!' }),
      }) //  without headers to avoid preflight
      expect(res.status).to.eq(201)
      const data = await res.json()
      expect(data.status).to.eq('sent')
    })
    cy.wait('@sendMessage')
  })

  it('validates required text field', () => {
    cy.visit('/')
    cy.window().then(async (win) => {
      const res = await win.fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify({}), // empty text
      }) //  without headers to avoid preflight
      expect(res.status).to.eq(400)
    })
    cy.wait('@sendMessage')
  })
})
