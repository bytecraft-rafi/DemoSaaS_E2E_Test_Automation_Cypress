describe('Signup Security Tests', () => {
  beforeEach(() => cy.visit('/sign-up'));

  it('Does not allow XSS scripts in inputs', () => {
    cy.get('input[name="firstName"]').type('<script>alert("xss")</script>');
    cy.get('input[name="lastName"]').type('<img src=x onerror=alert("xss") />');
    cy.get('input[name="email"]').type('user1212@example.com');
    cy.get('input[type="password"]').type('ValidPass123!');
    cy.contains('Create account').click();
     cy.url().should('not.include', '/verify-email');
  });

  it('Form submission uses HTTPS', () => {
    cy.location('protocol').should('eq', 'https:');
  });

  it('Password field uses autocomplete="new-password"', () => {
    cy.get('input[type="password"]').should('have.attr', 'autocomplete', 'new-password');
  });

  it('Form does not expose password in URL after submission', () => {
    cy.get('input[name="firstName"]').type('John11');
    cy.get('input[name="lastName"]').type('Doe11');
    cy.get('input[name="email"]').type('joh11n@example.com');
    cy.get('input[type="password"]').type('ValidPass123!');
    cy.contains('Create account').click();
    cy.url().should('not.include', 'ValidPass123!');
  });

  it('CSRF token is present in signup request', () => {
    cy.intercept('POST', '/api/signup', (req) => {
      expect(req.headers).to.have.property('x-csrf-token');
      req.reply(201, { message: 'ok' });
    }).as('csrfCheck');

    cy.get('input[name="firstName"]').type('Jane12');
    cy.get('input[name="lastName"]').type('Doe12');
    cy.get('input[name="email"]').type('jan12e.doe@example.com');
    cy.get('input[type="password"]').type('ValidPass123!');
    cy.contains('Create account').click();
    cy.wait('@csrfCheck');
  });
});
