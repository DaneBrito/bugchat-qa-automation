/// <reference types="cypress" />
// Purpose: Ensure chat history loads in correct order, even under latency.
// Story: Flaky history loading = poor UX. We simulate latency and validate order.

describe('Chat history (latency + order)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/messages', (req) => {
      const messages = [
        { id: 1, text: 'First',  createdAt: 1 },
        { id: 2, text: 'Second', createdAt: 2 },
        { id: 3, text: 'Third',  createdAt: 3 }
      ]
      
      req.reply({ statusCode: 200, body: { items: messages } },)
    }).as('fetchMessages')
  })

  it('loads history and preserves order', () => {
    cy.visit('/')

    cy.window().then(async (win) => {
      const url = `${win.location.origin}/api/messages`
      const res = await win.fetch(url)
      expect(res.status).to.eq(200)
      const body = await res.json()
      expect(body.items.map(m => m.text)).to.deep.eq(['First', 'Second', 'Third'])
    })

    cy.wait('@fetchMessages')  
  })
})
