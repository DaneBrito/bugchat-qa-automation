
describe('Messages API shape (sample)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/messages', {
      statusCode: 200,
      body: [{ id: 1, text: 'hello' }, { id: 2, text: 'world' }],
    }).as('messages');
  });

  it('GET returns an array-like shape (sample placeholder)', () => {
    cy.request('/api/messages')
      .its('body')
      .should((body) => {
        expect(body).to.be.an('array');
        expect(body[0]).to.have.keys('id', 'text');
      });
  });
});