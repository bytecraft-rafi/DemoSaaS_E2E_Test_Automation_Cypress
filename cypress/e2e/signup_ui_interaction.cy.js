describe('Signup UI Interaction', () => {
  beforeEach(() => cy.visit('/sign-up'));

  it('Password visibility toggle works', () => {
    cy.get('input[type="password"]').type('MyPass123!');
    cy.get('button[aria-label*="password"]').click();
    cy.get('input[type="text"]').should('have.value', 'MyPass123!');
    cy.get('button[aria-label*="password"]').click();
    cy.get('input[type="password"]').should('have.value', 'MyPass123!');
  });

  it('Error messages disappear after correction', () => {
    cy.contains('Create account').click();
    cy.contains('First name is required').should('exist');
    cy.get('input[placeholder="First name"]').type('John');
    cy.contains('First name is required').should('not.exist');
  });

  it('Create account button disables with invalid inputs', () => {
    cy.get('input[placeholder="First name"]').type('John');
    cy.get('input[placeholder="Last name"]').type('Doe');
    cy.get('input[type="email"]').type('invalidemail');
    cy.get('input[type="password"]').type('short');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Tab order follows form fields correctly', () => {
    cy.get('body').tab().should('have.attr', 'placeholder', 'First name');
    cy.focused().tab().should('have.attr', 'placeholder', 'Last name');
    cy.focused().tab().should('have.attr', 'type', 'email');
    cy.focused().tab().should('have.attr', 'type', 'password');
    cy.focused().tab().should('contain.text', 'Create account');
  });

  it('Responsive layout works on mobile viewport', () => {
    cy.viewport('iphone-6');
    cy.get('form').should('be.visible');
    cy.contains('Create account').should('be.visible');
  });

  it('Clicking outside a field triggers validation', () => {
    cy.get('input[placeholder="First name"]').focus().blur();
    cy.contains('First name is required').should('exist');
  });
});
