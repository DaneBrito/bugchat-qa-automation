/// <reference types="cypress" />
// Purpose: Demonstrate a clean login flow with API stubbing and assertions.
// Story: BugChat requires a reliable login to access real-time conversations.
describe('Login flow (stubbed)', () => {
  beforeEach(() => {
    cy.fixture('user').as('user')
    cy.intercept('POST', '/api/login', (req) => {
      const { email, password } = req.body || {}
      if (email === 'qa@bugchat.io' && password === 'super-secret') {
        req.reply({ statusCode: 200, body: { token: 'fake-jwt', user: { id: 1, name: 'QA Dani' } } })
      } else {
        req.reply({ statusCode: 401, body: { message: 'Unauthorized' } })
      }
    }).as('login')
  })

  it('logs in successfully with valid credentials', function () {
    cy.visit('/') // garante contexto de browser
    cy.window().then(async (win) => {
      const res = await win.fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.user.email, password: this.user.password }),
      })
      expect(res.status).to.eq(200)
      const data = await res.json()
      expect(data).to.have.property('token', 'fake-jwt')
      expect(data.user).to.have.property('name', 'QA Dani')
    })
    cy.get('@login').its('callCount').should('be.gte', 1)
  })

  it('rejects invalid credentials', () => {
    cy.visit('/')
    cy.window().then(async (win) => {
      const res = await win.fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'wrong@user', password: 'nope' }),
      })
      expect(res.status).to.eq(401)
    })
    cy.get('@login').its('callCount').should('be.gte', 1)
  })
})

