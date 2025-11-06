/// <reference types="cypress" />
describe('Users API shape (sample)', () => {
  it('GET returns metadata (sample placeholder)', () => {
    const payload = { meta: { total: 3 }, data: [{ id: 1 }, { id: 2 }, { id: 3 }] };

    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: payload,
    }).as('users');

    cy.request('/api/users')
      .its('body')
      .should((body) => {
        expect(body).to.have.property('meta');
        expect(body.meta).to.have.property('total', 3);
      });

    cy.wait('@users');
  });
});
