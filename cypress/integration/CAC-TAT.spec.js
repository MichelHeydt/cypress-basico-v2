/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(function() {
        cy.visit('./src/index.html')
      })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }) 

    //exercício 1
    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat('Automação de testes', 20) //Comando Cypress._.repeat, vai repetir a string pela qtd de vezes que passar no parâmetro
        
        cy.clock()  //congela o relógio do navegador

        cy.get('#firstName').type('Michel')
        cy.get('#lastName').type('Heydt')
        cy.get('#email').type('michel@cvc.com.br')
        cy.get('#open-text-area').type(longText, {delay: 0}) //delay = 0 para digitar um texto longo imediatamente.
        
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)   //adianta o relógio do navegador em 3 segundos
        cy.get('.success').should('not.be.visible')
    });

    //exercício extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()  //congela o relógio do navegador
        
        cy.get('#firstName').type('Michel')
        cy.get('#lastName').type('Heydt')
        cy.get('#email').type('michelcvc.com.br')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)   //adianta o relógio do navegador em 3 segundos
        cy.get('.error').should('not.be.visible')
    });

    //exercício extra 3
    it('valida campo de telefone quando digita campo não númerico', () => {
        cy.clock()  //congela o relógio do navegador
        
        cy.get('#firstName').type('Michel')
        cy.get('#lastName').type('Heydt')
        cy.get('#email').type('michelcvc.com.br')
        cy.get('#phone').type('testetelefone').should('have.value', '')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)   //adianta o relógio do navegador em 3 segundos
        cy.get('.error').should('not.be.visible')
    });

    //exercício extra 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()  //congela o relógio do navegador
        
        cy.get('#firstName').type('Michel')
        cy.get('#lastName').type('Heydt')
        cy.get('#email').type('michelcvc.com.br')
        cy.get('#phone-checkbox')
         .check()
         .should('be.checked')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)   //adianta o relógio do navegador em 3 segundos
        cy.get('.error').should('not.be.visible')
    });

    //exercício extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Michel').should('have.value', 'Michel').clear().should('have.value', '')
        cy.get('#lastName').type('Heydt').should('have.value', 'Heydt').clear().should('have.value', '')
        cy.get('#email').type('michel@cvc.com.br').should('have.value', 'michel@cvc.com.br').clear().should('have.value', '')
        cy.get('#phone').type('9384329483').should('have.value', '9384329483').clear().should('have.value', '')
    });

    //exercício extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()  //congela o relógio do navegador

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)   //adianta o relógio do navegador em 3 segundos
        cy.get('.error').should('not.be.visible')
    });

    //exercício extra 7 (Comandos customizados)
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.clock()  //congela o relógio do navegador
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)   //adianta o relógio do navegador em 3 segundos
    })

    //exercício extra 8 (Contains)
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock()  //congela o relógio do navegador
        
        cy.fillMandatoryFieldsAndSubmit()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)   //adianta o relógio do navegador em 3 segundos
        cy.get('.success').should('not.be.visible')
    })

    it('utilizando select para campos suspensos', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    });

    it('utilizando select para campos suspensos por VALUE', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });

    //marcar campos do tipo radio
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked', 'feedback')
    });

    //marcar campos do tipo radio utilizando each
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    //marcar checkbox (genericamente)
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
         .check()
         .should('be.checked')
         .last()
         .uncheck()
         .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
         .selectFile('cypress/fixtures/example.json')
         .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
         }) 
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')
         .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
         .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
       cy.fixture('example.json').as('sampleFile')
       cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    });    

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')    //verifica se contém a propriedade '_blank' significando que o link será aberto em uma nova aba
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
         .invoke('removeAttr', 'target')
         .click()
        cy.contains('Talking About Testing').should('be.visible')
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')  //recurso "and" é usado para validar junto com o should
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')   //recurso "and" é usado para validar junto com o should  
          .invoke('hide')
          .should('not.be.visible')
      })

      it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('Automação de testes', 20)
        cy.get('#open-text-area')
         .invoke('val', longText)   //utilizando o invoke irá setar o valor no campo area instantaneamente
         .should('have.value', longText)
      });

      it('faz uma requisição HTTP(API)', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')  //Faz a requisição do tipo GET
         .should(function(response){
            const {status, statusText, body} = response //Desestruturando a requisição e armazendo nas constantes
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
         })
      });

      it('encontra o gato escondido', () => {
        cy.get('#cat')
         .invoke('show')
         .should('be.visible')
      });

})