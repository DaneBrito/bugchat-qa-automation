
describe('Users API shape (sample)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/users', {
      statusCode: 200,
      body: { items: [{ id: 1, name: 'Ada' }] }
    }).as('users');
  });

  it('GET returns metadata (sample placeholder)', () => {
    cy.visit('/');
    cy.window().then(async (win) => {
      const res = await win.fetch(`${win.location.origin}/api/users`);
      expect(res.status).to.eq(200);
      const body = await res.json();
      expect(body.items).to.be.an('array');
    });
  });
});