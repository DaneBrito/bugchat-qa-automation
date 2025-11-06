
describe('API health', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/health', {
      statusCode: 200,
      body: { slideshow: { title: 'OK' } },
    }).as('health');
  });

  it('http health returns 200', () => {
    cy.request('/api/health').its('status').should('eq', 200);
  });

  it('json payload has slideshow key', () => {
    cy.request('/api/health')
      .its('body')
      .should('have.property', 'slideshow');
  });
});
