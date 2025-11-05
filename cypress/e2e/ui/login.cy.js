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
    cy.visit('/')
    cy.request('POST', '/api/login', { email: this.user.email, password: this.user.password }).as('loginCall')
    cy.get('@loginCall').its('status').should('eq', 200)
    cy.get('@login').should('have.property', 'callCount')
  })

  it('rejects invalid credentials', () => {
    cy.request({ method: 'POST', url: '/api/login', body: { email: 'wrong@user', password: 'nope' }, failOnStatusCode: false })
      .its('status').should('eq', 401)
  })
})
