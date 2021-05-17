describe('transactions route', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/transactions');
  });

  it('should render transaction list', () => {
    cy.get('.transaction-list').should('be.visible');
  });

  it('should render button to make a transfer', () => {
    cy.get('button').should('be.visible').and('contain', 'Make a Transfer');
  });

  it('should render select for accountId', () => {
    cy.get('select#accountId').should('be.visible');
  });
});
