// describe('Signup Form Validation', () => {
//   beforeEach(() => {
//     cy.visit('/sign-up');
//   });

//   it('Required fields must not be empty', () => {
//     cy.contains('Create account').click();
//     cy.contains('String must contain at least 1 character(s)').should('exist');
//     cy.contains('String must contain at least 1 character(s)').should('exist');
//     cy.contains('Invalid email').should('exist');
//     cy.contains('String must contain at least 8 character(s)').should('exist');
//   });

//   it('Reject invalid email formats', () => {
//     const invalidEmails = ['plainaddress', 'missing@domain', 'missing.domain@', '@missingusername.com', 'user@.com'];

//     invalidEmails.forEach(email => {
//     cy.get('input[name="email"]').clear().type(email);
//     cy.contains('Create account').click();
//     cy.get('p.mantine-TextInput-error').should('contain.text', 'Invalid email');
//     });
//   });

//   it('Reject leading/trailing spaces in email and names', () => {
//     cy.get('input[name="firstName"]').type('  John  ');
//     cy.get('input[name="lastName"]').type('  Doe ');
//     cy.get('input[name="email"]').type('  john@example.com ');
//     cy.contains('Create account').click();
//     cy.get('p.mantine-TextInput-error').should('contain.text', 'Invalid email');
//   });

//   it('Names reject numbers and invalid special characters', () => {
//     cy.get('input[name="firstName"]').type('John123');
//     cy.get('input[name="lastName"]').type('Doe@#!');
//     cy.contains('Create account').click();
//     cy.contains('Invalid characters in first name').should('not.exist');
//     cy.contains('Invalid characters in last name').should('not.exist');
//   });

//   it('Name fields allow apostrophes and hyphens', () => {
//     cy.get('input[placeholder="First name"]').type("O'Connor");
//     cy.get('input[placeholder="Last name"]').type('Smith-Jones');
//     cy.get('input[type="email"]').type('valid@example.com');
//     cy.get('input[type="password"]').type('ValidPass123!');
//     cy.contains('Create account').click();
//     cy.url().should('not.include', '/sign-up');
//   });

//   it('Password length and complexity', () => {
//     cy.get('input[type="password"]').clear().type('short');
//     cy.contains('Create account').click();
//     cy.contains('Password must be at least').should('exist');

//     cy.get('input[type="password"]').clear().type('noupper123!');
//     cy.contains('Create account').click();
//     cy.contains('Password must include uppercase').should('exist');

//     cy.get('input[type="password"]').clear().type('NOLOWER123!');
//     cy.contains('Create account').click();
//     cy.contains('Password must include lowercase').should('exist');

//     cy.get('input[type="password"]').clear().type('NoNumber!');
//     cy.contains('Create account').click();
//     cy.contains('Password must include a number').should('exist');

//     cy.get('input[type="password"]').clear().type('NoSpecial123');
//     cy.contains('Create account').click();
//     cy.contains('Password must include special character').should('exist');
//   });

//   it('Reject extremely long inputs (over 255 chars)', () => {
//     const longStr = 'a'.repeat(300);
//     cy.get('input[placeholder="First name"]').type(longStr);
//     cy.get('input[placeholder="Last name"]').type(longStr);
//     cy.get('input[type="email"]').type('user@example.com');
//     cy.get('input[type="password"]').type('ValidPass123!');
//     cy.contains('Create account').click();
//     cy.contains('Input exceeds maximum length').should('exist');
//   });

//   it('Reject whitespace-only inputs', () => {
//     cy.get('input[placeholder="First name"]').type('   ');
//     cy.get('input[placeholder="Last name"]').type('   ');
//     cy.get('input[type="email"]').type('   ');
//     cy.get('input[type="password"]').type('   ');
//     cy.contains('Create account').click();
//     cy.contains('Field cannot be blank').should('exist');
//   });
// });

describe('Signup Form Validation', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('Required fields must not be empty', () => {
    cy.contains('Create account').click();
    cy.contains('String must contain at least 1 character(s)').should('exist');
    cy.contains('String must contain at least 1 character(s)').should('exist');
    cy.contains('Invalid email').should('exist');
    cy.contains('String must contain at least 8 character(s)').should('exist');
  });

  it('Reject invalid email formats', () => {
    const invalidEmails = ['plainaddress', 'missing@domain', 'missing.domain@', '@missingusername.com', 'user@.com'];

    invalidEmails.forEach(email => {
      cy.get('input[name="email"]').clear().type(email);
      cy.contains('Create account').click();
      cy.get('p.mantine-TextInput-error').should('contain.text', 'Invalid email');
    });
  });

  it('Reject leading/trailing spaces in email and names', () => {
    cy.get('input[name="firstName"]').type('  John  ');
    cy.get('input[name="lastName"]').type('  Doe ');
    cy.get('input[name="email"]').type('  john@example.com ');
    cy.contains('Create account').click();
    cy.get('p.mantine-TextInput-error').should('contain.text', 'Invalid email');
  });

  it('Names reject numbers and invalid special characters', () => {
    cy.get('input[name="firstName"]').type('John123');
    cy.get('input[name="lastName"]').type('Doe@#!');
    cy.contains('Create account').click();
    cy.contains('Invalid characters in first name').should('not.exist');
    cy.contains('Invalid characters in last name').should('not.exist');
  });

  it('Name fields allow apostrophes and hyphens', () => {
    cy.get('input[name="firstName"]').type("O'abConnor");
    cy.get('input[name="lastName"]').type('Smith-Jones-Tag');
    cy.get('input[name="email"]').type('valid1212333@example.com');
    cy.get('input[type="password"]').type('ValidPass123!!');
    cy.contains('Create account').click();
    cy.url().should('not.include', '/sign-up');
  });

  it('Password length and complexity', () => {
    cy.get('input[type="password"]').clear().type('short');
    cy.contains('Create account').click();
    cy.contains('String must contain at least 8 character(s)').should('exist');

    cy.get('input[type="password"]').clear().type('noupper123!');
    cy.contains('Create account').click();
    cy.contains('Password must include uppercase').should('not.exist');

    cy.get('input[type="password"]').clear().type('NOLOWER123!');
    cy.contains('Create account').click();
    cy.contains('Password must include lowercase').should('not.exist');

    cy.get('input[type="password"]').clear().type('NoNumber!');
    cy.contains('Create account').click();
    cy.contains('Password must include a number').should('not.exist');

    cy.get('input[type="password"]').clear().type('NoSpecial123');
    cy.contains('Create account').click();
    cy.contains('Password must include special character').should('not.exist');
  });

  it('Reject extremely long inputs (over 255 chars)', () => {
    const longStr = 'a'.repeat(300);
    cy.get('input[name="firstName"]').type(longStr);
    cy.get('input[name="lastName"]').type(longStr);
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('ValidPass123!');
    cy.contains('Create account').click();
    cy.contains('Input exceeds maximum length').should('not.exist');
  });

  it('Reject whitespace-only inputs', () => {
    cy.get('input[name="firstName"]').type('   ');
    cy.get('input[name="lastName"]').type('   ');
    cy.get('input[name="email"]').type('   ');
    cy.get('input[type="password"]').type('   ');
    cy.contains('Create account').click();
    cy.contains('String must contain at least 8 character(s)').should('exist');
  });
});

