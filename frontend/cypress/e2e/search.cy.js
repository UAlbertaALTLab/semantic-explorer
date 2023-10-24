import { Button } from "@material-ui/core"

describe('search with enter', () => {
  it('users can search a word with enter', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[name = "searchInput"]').type('{enter}');//test for no input
    cy.get('[name = "searchInput"]').click().type('atim').type('{enter}');
  })
})

describe('search by clicking the button', () => {
  it('users can search a word', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[name = "searchInput"]').click().type('atim');
    cy.get('button').first().click();
    // wait for results section to load
    cy.wait(5000);
    // click on the first button of the first result of .MuiList-root
    cy.get('.MuiList-root').first().find('button').first().click();
    cy.get('[name="hypernymButtonBeast of burden"]').click({force: true});
    cy.wait(1000);
    cy.get('[name="hypernymButtonDomesticated animal"]').click({force: true});
    cy.wait(1000);
    cy.get('[name="hyponymButtonAnimal husbandry"]').click({force: true});
  })
})