/// <reference types="cypress" />
// Purpose: Demonstrate a clean login flow with API stubbing and assertions.
// Story: BugChat requires a reliable login to access real-time conversations.
describe('Login flow (stubbed)', () => {
  beforeEach(() => {
    cy.fixture('user').as('user')

    cy.intercept('POST', '**/api/login', (req) => {
      // req.body may arrive as string or object
      let body = req.body
      if (typeof body === 'string') {
        try { body = JSON.parse(body) } catch { body = {} }
      }
      const { email, password } = body || {}

      if (email === 'qa@bugchat.io' && password === 'super-secret') {
        req.reply({ statusCode: 200, body: { token: 'fake-jwt', user: { id: 1, name: 'QA Dani' } } })
      } else {
        req.reply({ statusCode: 401, body: { message: 'Unauthorized' } })
      }
    }).as('login')
  })

  it('logs in successfully with valid credentials', function () {
    cy.visit('/')
    cy.window().then(async (win) => {
      const res = await win.fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email: this.user.email, password: this.user.password }),
      }) // without headers to avoid preflight
      expect(res.status).to.eq(200)
      const data = await res.json()
      expect(data.token).to.eq('fake-jwt')
      expect(data.user.name).to.eq('QA Dani')
    })
    cy.wait('@login')
  })

  it('rejects invalid credentials', () => {
    cy.visit('/')
    cy.window().then(async (win) => {
      const res = await win.fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'wrong@user', password: 'nope' }),
      }) // without headers to avoid preflight
      expect(res.status).to.eq(401)
    })
    cy.wait('@login')
  })
})
