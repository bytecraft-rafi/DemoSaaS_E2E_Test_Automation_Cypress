describe('Settings Page - Organization Members', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/abdullah-al-rafi/settings');
  });

  it('Organization members section displays current members', () => {
    cy.contains('Organization members').should('exist');
    cy.get('.organization-member').should('have.length.gte', 1); // Adjust selector accordingly
    cy.contains('Abdullah Al Rafi').should('exist');
    cy.contains('rafiabdps@gmail.com').should('exist');
  });

  it('Admin role dropdown is disabled for current user', () => {
    cy.get('.organization-member').within(() => {
      cy.get('select').should('be.disabled');
    });
  });

  it('Remove member button is not visible for current user', () => {
    cy.get('.organization-member').within(() => {
      cy.get('button').should('not.exist'); // Or specify selector for remove buttons
    });
  });

  it('Add member button is visible and clickable', () => {
    cy.contains('Add member').should('be.visible').click();
    cy.url().should('include', '/settings/add-member'); // or modal presence
  });
});
