describe('Tickets Page - Search Functionality', () => {
  beforeEach(() => {
    cy.login();  // login first
    cy.visit('/abdullah-al-rafi/tickets');
  });

  it('Search input filters tickets by title or id', () => {
    // Type a partial title that matches some tickets
    cy.get('input[placeholder="Enter ticket title or id"]').type('Data import');
    
    // Verify that all visible ticket rows contain the search term in title or id
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('td').eq(0).should('contain.text', 'Data import');
    });
  });

  it('Search input filters tickets by exact title', () => {
    cy.get('input[placeholder="Enter ticket title or id"]').clear().type('Password complexity requirements not enforced');
    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('table tbody tr').first().find('td').eq(0).should('contain.text', 'Password complexity requirements not enforced');
  });

  it('Search input returns no results for non-existent text', () => {
    cy.get('input[placeholder="Enter ticket title or id"]').clear().type('NonExistentTicket12345');
    cy.get('table tbody tr').should('have.length', 0);
    cy.contains('No tickets found').should('exist'); // if your app shows this message
  });

  it('Clearing search input resets ticket list', () => {
    cy.get('input[placeholder="Enter ticket title or id"]').clear();
    cy.get('table tbody tr').its('length').should('be.gte', 1);
  });

  it('Search input clears results when cleared', () => {
    cy.get('input[placeholder="Enter ticket title or id"]').type('Data import');
    cy.get('table tbody tr').should('have.length.gte', 1);
    cy.get('input[placeholder="Enter ticket title or id"]').clear();
    cy.get('table tbody tr').should('have.length.gte', 1);
  });
});
