
Cypress._.times(3, function(){  //Comando "Cypress._.times" executa o teste a quantidade de vezes que passar por parâmetro

    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
    
        cy.contains('Talking About Testing').should('be.visible')
        
    })
})
