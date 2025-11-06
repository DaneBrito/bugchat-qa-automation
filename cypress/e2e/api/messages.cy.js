
describe('Messages API shape (sample)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/messages', {
      statusCode: 200,
      body: { items: [{ id: 1, text: 'hello' }] }
    }).as('msgs');
  });

  it('GET returns an array-like shape (sample placeholder)', () => {
    cy.visit('/');
    cy.window().then(async (win) => {
      const res = await win.fetch(`${win.location.origin}/api/messages`);
      expect(res.status).to.eq(200);
      const body = await res.json();
      expect(body.items).to.be.an('array');
    });
  });
});