describe('navigation', () => {
  it('should render transactions for root', () => {
    cy.visit('localhost:3000');
    cy.get('.transactions').should('exist');
  });

  it('should render for all routes', () => {
    cy.visit('localhost:3000/transactions');
    cy.location('pathname').should('include', 'transactions');
    cy.get('.transactions').should('exist');

    cy.visit('localhost:3000/transfer');
    cy.location('pathname').should('include', 'transfer');
    cy.get('.transfer').should('exist');
  });
});
