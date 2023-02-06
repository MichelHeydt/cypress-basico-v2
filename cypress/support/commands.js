Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Michel')
    cy.get('#lastName').type('Heydt')
    cy.get('#email').type('michel@cvc.com.br')
    cy.get('#open-text-area').type('Teste') //delay = 0 para digitar um texto longo imediatamente.
    cy.contains('button', 'Enviar').click()
})