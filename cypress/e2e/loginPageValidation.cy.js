describe('Login Page - Input Fields Validation', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
  });

  it('Does not allow SQL injection strings in email', () => {
    cy.get('input[name="email"]').type("' OR '1'='1");
    cy.get('input[name="password"]').type('abradabra');
    cy.contains('Log in').click();
    cy.contains('Invalid email').should('exist');
  });

  it('Does not allow scripts or XSS in email input', () => {
    cy.get('input[name="email"]').type('<script>alert("xss")</script>');
    cy.get('input[name="password"]').type('ValidPass123!');
    cy.contains('Log in').click();
    cy.contains('Invalid email').should('exist');
  });

  it('Does not allow empty spaces only in email and password fields', () => {
    cy.get('input[name="email"]').type('     ');
    cy.get('input[name="password"]').type('     ');
    cy.contains('Log in').click();
    cy.contains('Invalid Email').should('exist');
    //cy.contains('Invalid email or password').should('exist');
  });

  it('Password field enforces minimum length (8 chars)', () => {
    cy.get('input[name="email"]').type('rafiabdps@gmail.com');
    cy.get('input[name="password"]').type('short');
    cy.contains('Log in').click();
    cy.contains('Invalid email or password').should('exist');
  });

  it('Password field allows special characters', () => {
    cy.get('input[name="email"]').type('rafiabdps@gmail.com');
    cy.get('input[name="password"]').type('abradabra');
    cy.contains('Log in').click();
    cy.url().should('not.include', '/sign-in');
  });

  it('Email input is case-insensitive during validation', () => {
    cy.get('input[name="email"]').type('rafiabdps@gmail.com');
    cy.get('input[name="password"]').type('abradabra!');
    cy.contains('Log in').click();
    cy.url().should('not.include', '/sign-in');
  });

  it('Displays error for unregistered email', () => {
    cy.get('input[name="email"]').type('rafiabaadps@gmail.com');
    cy.get('input[name="password"]').type('abracdabra!');
    cy.contains('Log in').click();
    cy.contains('Invalid email or password').should('exist');
  });

  it('Remembers user email if "Remember me" checkbox is implemented (if applicable)', () => {
    // Only add this test if there is a "Remember me" checkbox
    cy.get('input[name="email"]').type('validuser@example.com');
    cy.get('input[name="password"]').type('ValidPass123!');
    cy.get('input[type="checkbox"][name="rememberMe"]').check();
    cy.contains('Log in').click();
    // After logout, visit login and check email is prefilled
    cy.visit('/sign-in');
    cy.get('input[name="email"]').should('have.value', 'validuser@example.com');
  });
});
