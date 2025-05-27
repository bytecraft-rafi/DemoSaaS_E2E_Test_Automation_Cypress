describe('Tickets Page - List Rendering and Content', () => {
  beforeEach(() => {
    cy.login();  // login first
    cy.visit('/abdullah-al-rafi/tickets');
  });

  it('Should render tickets table with the correct columns', () => {
    cy.get('table').should('exist');
    cy.get('table thead tr th').eq(0).should('contain.text', 'Title');
    cy.get('table thead tr th').eq(1).should('contain.text', 'Reported by');
    cy.get('table thead tr th').eq(2).should('contain.text', 'Status');
    cy.get('table thead tr th').eq(3).should('contain.text', 'Created at');
  });

  it('Should display at least one ticket row', () => {
    cy.get('table tbody tr').its('length').should('be.gte', 1);
  });

  it('Each ticket row should have title, reporter email, status, and created date', () => {
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('td').eq(0).should('not.be.empty'); // Title
        cy.get('td').eq(1).should('contain.text', '@'); // Email contains @
        cy.get('td').eq(2).should('not.be.empty'); // Status label text
        cy.get('td').eq(3).should('match', /\d+ days ago/); // Created at format
      });
    });
  });

  it('Status labels should have correct classes/colors for each status', () => {
    const statusColorMap = {
      'NEW': 'blue',
      'IN PROGRESS': 'orange',
      'CLOSED': 'red',
      'RESOLVED': 'green'
    };

    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('td').eq(2).then($statusCell => {
        const statusText = $statusCell.text().trim();
        // Using CSS class prefix from your screenshot, adjust if different
        if (statusText === 'NEW') cy.wrap($statusCell).should('have.class', 'blue');
        else if (statusText === 'IN PROGRESS') cy.wrap($statusCell).should('have.class', 'orange');
        else if (statusText === 'CLOSED') cy.wrap($statusCell).should('have.class', 'red');
        else if (statusText === 'RESOLVED') cy.wrap($statusCell).should('have.class', 'green');
      });
    });
  });
});
