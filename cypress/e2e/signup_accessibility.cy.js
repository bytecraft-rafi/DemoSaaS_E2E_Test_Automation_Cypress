describe('Signup Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('Form fields have proper labels and aria attributes', () => {
  // For each input, check it has an ID
  cy.get('input[name="firstName"]').should('have.attr', 'id').then(id => {
    // And check label exists with for=id
    cy.get(`label[for="${id}"]`).should('exist').and('not.be.empty');
  });

  cy.get('input[name="lastName"]').should('have.attr', 'id').then(id => {
    cy.get(`label[for="${id}"]`).should('exist').and('not.be.empty');
  });

  cy.get('input[name="email"]').should('have.attr', 'id').then(id => {
    cy.get(`label[for="${id}"]`).should('exist').and('not.be.empty');
  });

  cy.get('input[type="password"]').should('have.attr', 'id').then(id => {
    cy.get(`label[for="${id}"]`).should('exist').and('not.be.empty');
  });
});

//   it('Error messages are announced to screen readers', () => {
//   cy.contains('Create account').click();

//   // Check if at least one error message with role alert exists
//   cy.get('[role="alert"]').should('exist');
  
//   // Or more specific if you want to check error class with alert role
//   cy.get('.mantine-InputWrapper-error[role="alert"], .mantine-TextInput-error[role="alert"]').should('exist');
// });


//   it('Keyboard navigation works through all interactive elements', () => {
//   // Start at body and tab to first input
//   cy.get('body').tab().should('have.attr', 'name', 'firstName');

//   // Then tab to last name
//   cy.focused().tab().should('have.attr', 'name', 'lastName');

//   // Then tab to email
//   cy.focused().tab().should('have.attr', 'name', 'email');

//   // Then tab to password (type=password)
//   cy.focused().tab().should('have.attr', 'type', 'password');

//   // Then tab to Create account button and check text
//   cy.focused().tab().should('contain.text', 'Create account');
// });


  it('Color contrast meets WCAG standards (basic check)', () => {
    cy.get('button[type="submit"]').should('have.css', 'background-color')
      .and((bg) => {
        expect(bg).not.to.equal('rgb(255, 255, 255)');
      });
  });
});
