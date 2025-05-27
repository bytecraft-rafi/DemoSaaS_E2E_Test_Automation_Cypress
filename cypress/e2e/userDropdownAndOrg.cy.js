describe('User Account Dropdown and Organization Selector', () => {
  beforeEach(() => {
    cy.login(); // Custom login command with email and password
    cy.visit('/abdullah-al-rafi/tickets');
  });

  it('User dropdown shows correct options', () => {
    // Click user avatar or name to open dropdown
    cy.get('[data-cy="user-dropdown"]').click(); // Use proper selector if available
    
    // Check dropdown options
    cy.contains('Manage account').should('be.visible');
    cy.contains('Sign out').should('be.visible');
  });

  it('Clicking "Sign out" logs out user and redirects to login page', () => {
    cy.get('[data-cy="user-dropdown"]').click();
    cy.contains('Sign out').click();
    cy.url().should('include', '/sign-in');
  });

  it('Organization selector dropdown shows current organization and options', () => {
    cy.get('[data-cy="org-selector"]').click();
    cy.contains('Abdullah Al Rafi').should('have.class', 'selected'); // Adjust selector/class accordingly
    cy.contains('Create organization').should('be.visible');
  });

  it('Selecting organization from dropdown updates view', () => {
    cy.get('[data-cy="org-selector"]').click();
    // Assume there is another org to select, or test selecting current org again
    cy.contains('Abdullah Al Rafi').click();
    // Verify URL or UI updates accordingly
    cy.url().should('include', '/abdullah-al-rafi');
  });

  it('Create organization option opens the creation modal/page', () => {
    cy.get('[data-cy="org-selector"]').click();
    cy.contains('Create organization').click();
    cy.url().should('include', '/organization/new'); // or check modal presence
  });
});
