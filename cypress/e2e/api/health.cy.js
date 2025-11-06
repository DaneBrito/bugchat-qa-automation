
describe('API health', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/health', {
      statusCode: 200,
      body: { slideshow: { title: 'ok' } }
    }).as('health');
  });

  it('http health returns 200', () => {
    cy.visit('/');
    cy.window().then(async (win) => {
      const res = await win.fetch(`${win.location.origin}/api/health`);
      expect(res.status).to.eq(200);
    });
  });

  it('json payload has slideshow key', () => {
    cy.visit('/');
    cy.window().then(async (win) => {
      const res = await win.fetch(`${win.location.origin}/api/health`);
      const body = await res.json();
      expect(body).to.have.property('slideshow');
    });
  });
});
