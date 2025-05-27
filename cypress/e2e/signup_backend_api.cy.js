describe('Signup Backend/API Integration', () => {
  beforeEach(() => cy.visit('/sign-up'));

  it('Successful signup redirects user', () => {
    cy.intercept('POST', '/api/signup', { statusCode: 201, body: { message: 'User created' } }).as('signupRequest');
    cy.get('input[name="firstName"]').type('JaneKa');
    cy.get('input[name="lastName"]').type('DoeHa');
    cy.get('input[name="email"]').type('janekaka.doe@example.com');
    cy.get('input[type="password"]').type('ValidPass12312!');
    cy.contains('Create account').click();
    cy.wait('@signupRequest');
    cy.url().should('not.include', '/sign-up');
    //cy.contains('Welcome').should('exist');
  });

  it('Shows error on email already registered', () => {
    cy.intercept('POST', '/api/signup', {
      statusCode: 400,
      body: { error: 'Email already registered' }
    }).as('signupDuplicate');

    cy.get('input[name="firstName"]').type('JaneKa');
    cy.get('input[name="lastName"]').type('DoeHa');
    cy.get('input[name="email"]').type('janekaka.doe@example.com');
    cy.get('input[type="password"]').type('ValidPass12312!');
    cy.contains('Create account').click();
    cy.wait('@signupDuplicate');
    cy.contains('User already exists').should('exist');
  });


  it('Handles server error gracefully', () => {
    cy.intercept('POST', '/api/signup', { statusCode: 500 }).as('serverError');
    cy.get('input[name="firstName"]').type('JaneKa');
    cy.get('input[name="lastName"]').type('DoeHa');
    cy.get('input[name="email"]').type('janekaka.doe@example.com');
    cy.get('input[type="password"]').type('ValidPass123!');
    cy.contains('Create account').click();
    cy.wait('@serverError');
    cy.contains('Server error, please try again later').should('exist');
  });

  it('Prevents rapid multiple signup attempts (rate limiting)', () => {
    let attempts = 0;
    cy.intercept('POST', '/api/signup', (req) => {
      attempts++;
      if (attempts > 3) {
        req.reply(429, { error: 'Too many requests' });
      } else {
        req.reply(201, { message: 'User created' });
      }
    }).as('rateLimit');

    for (let i = 0; i < 5; i++) {
      cy.get('input[name="firstName"]').clear().type(`User${i}`);
      cy.get('input[name="lastName"]').clear().type('Test');
      cy.get('input[name="email"]').clear().type(`user${i}@example.com`);
      cy.get('input[type="password"]').clear().type('ValidPass123!');
      cy.contains('Create account').click();
    }
    cy.wait('@rateLimit');
    cy.contains('Too many requests').should('exist');
  });
});
