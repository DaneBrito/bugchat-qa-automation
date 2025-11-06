/// <reference types="cypress" />
describe('Messages API shape (sample)', () => {
  it('GET returns an array-like shape (sample placeholder)', () => {
    const sample = [{ id: 1, text: 'hello' }, { id: 2, text: 'world' }];

    cy.intercept('GET', '/api/messages', {
      statusCode: 200,
      body: sample,
    }).as('msgs');

    cy.request('/api/messages')
      .its('body')
      .should((body) => {
        expect(body).to.be.an('array');
        expect(body).to.have.length(2);
      });

    cy.wait('@msgs');
  });
