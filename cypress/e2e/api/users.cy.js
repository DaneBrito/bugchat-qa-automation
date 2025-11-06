
describe('Users API shape (sample)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/users', {
      statusCode: 200,
      body: { count: 3, items: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    }).as('users');
  });

  it('GET returns metadata (sample placeholder)', () => {
    cy.request('/api/users')
      .its('body')
      .should((body) => {
        expect(body).to.have.property('count', 3);
        expect(body.items).to.have.length(3);
      });
  });
});