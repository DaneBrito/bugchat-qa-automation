/// <reference types="cypress" />
describe('API health', () => {
  it('http health returns 200', () => {
    cy.intercept('GET', '/api/health', { statusCode: 200, body: {} }).as('health');
    cy.request('/api/health').its('status').should('eq', 200);
    cy.wait('@health');
  });

  it('json payload has slideshow key', () => {
    cy.intercept('GET', '/api/health', {
      statusCode: 200,
      body: { slideshow: { title: 'Sample' } },
    }).as('healthPayload');

    cy.request('/api/health')
      .its('body')
      .should('have.property', 'slideshow');

    cy.wait('@healthPayload');
  });
});
