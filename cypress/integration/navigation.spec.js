/// <reference types="cypress" />

describe('navigation', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('should render transactions for root', () => {
    cy.get('.transactions').should('exist');
  });

  it('should render for all routes', () => {
    cy.visit('/transactions');
    cy.location('pathname').should('include', 'transactions');

    cy.go(-1);
    cy.location('pathname').should('not.include', 'transactions');

    cy.visit('/transfer');
    cy.location('pathname').should('include', 'transfer');
  });

  it('should be able to reload the page', () => {
    cy.reload();
  });
});
