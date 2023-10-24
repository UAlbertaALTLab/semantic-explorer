describe('search by different mode such as Verb, Particle and Noun', () => {
    it('users can search a word by type', () => {
      cy.visit('http://localhost:3000/');
      cy.get('[name = "searchInput"]').click().type('atim');
      cy.get('button').eq(2).click();
      cy.get('#split-button-menu > :nth-child(2)').click();
      cy.get('.MuiButton-label').click();
    })
  })