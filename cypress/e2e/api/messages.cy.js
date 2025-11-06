/// <reference types="cypress" />
describe('Messages API shape (sample)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/messages', {
      statusCode: 200,
      body: { items: [{ id: 1, text: 'hello' }, { id: 2, text: 'world' }] },
    }).as('getMessages')
  })

  it('GET returns an array-like shape (sample placeholder)', () => {
    cy.request('/api/messages')
      .its('body.items')
      .should((arr) => {
        expect(arr).to.be.an('array')
        expect(arr[0]).to.have.property('text')
      })
    cy.wait('@getMessages')
  })
})
