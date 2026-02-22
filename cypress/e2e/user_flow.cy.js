describe('MoveInSync Critical User Flow', () => {
    it('verifies dashboard loads and navigates to rules config', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Command Center').should('be.visible');
        cy.get('.grid').should('exist');

        cy.visit('http://localhost:5173/rules');
        cy.contains('Rule Configuration').should('be.visible');
        cy.get('table').should('be.visible');
        cy.contains('Overspeeding Limit').should('exist');
    });

    it('opens the edit modal in rule configuration', () => {
        cy.visit('http://localhost:5173/rules');
        
        cy.contains('td', 'Overspeeding Limit')
          .parent()
          .find('button')
          .last()
          .click({ force: true });
        
        cy.contains('Edit Escalation Rule').should('be.visible');
        cy.get('button').contains('Cancel').click();
    });
});