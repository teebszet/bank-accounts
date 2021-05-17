describe('transfer route', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/transfer');
  });

  it('should render transfer form', () => {
    cy.get('.transfer form').should('be.visible');
  });

  it('should render 3 rows and a button within the form', () => {
    cy.get('.transfer form').children().should('have.length', '4');
  });

  it('should report amount field is required when submitting an empty field', () => {
    cy.get('.transfer-button button').click();
    cy.get('.amount input').should('have.focus');
    cy.get('.amount input').siblings('.error').should('be.visible');
  });

  it('should post a request to postTransfer with form fields', () => {
    cy.intercept('POST', '/*/transfer', (req) => {
      req.alias = 'postTransfer';
      expect(req.body).to.contain({
        toAccount: '02002',
        amount: 87,
        currency: 'HKD',
      });
      expect(req.url).to.match(/\/02001\/transfer$/);
    });
    cy.get('select#fromAccount').select('02001');
    cy.get('select#toAccount').select('02002');
    cy.get('select.currency').select('HKD');
    cy.get('.amount input').type(87);
    cy.get('.transfer-button button').click();
    cy.wait('@postTransfer');
  });

  it('should post a request to postTransfer with initial state form fields, if not selected', () => {
    cy.intercept('POST', '/*/transfer', (req) => {
      req.alias = 'postTransfer';
      expect(req.body).to.contain({
        toAccount: '02002',
        amount: 87,
        currency: 'HKD',
      });
      expect(req.url).to.match(/\/02001\/transfer$/);
    });
    cy.get('.amount input').type(87);
    cy.get('.transfer-button button').click();
    cy.wait('@postTransfer');
  });
});
