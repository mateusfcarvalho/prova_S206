const { it } = require("mocha");

describe('Entrar no site demoblaze', () => {
    it('Abrir site', () => {
        cy.visit("https://www.demoblaze.com/index.html");
    })
})

describe('Realizar Compra', () => { //loop
    it('Selecionar Xperia', () => {
        cy.get('*[class^= "hrefch"]').contains("Sony xperia z5").click()
    })
    it('Adicionar ao Carrinho', () => {
        cy.contains("Add to cart").click()
    })
    //aqui entra em loop
    it('Verificar Carrinho', () => {
        cy.get('.nav-link').contains("Cart").click()
    })
})

describe('Entrar no site computer_database', () => {
    it('Abrir site', () => {
        cy.visit("https://computer-database.gatling.io/computers");
    })
    it('Cadastrar Computador', () => {
       cy.visit("https://computer-database.gatling.io/computers/new")
    })
    it('Adicionar dados', () => {
        let userInfo = createUser()

        cy.visit("https://computer-database.gatling.io/computers/new")
    
        cy.get("input[name=name]").type(userInfo[0])
        cy.get("input[name=introduced]").type(userInfo[1])
        cy.get("input[name=discontinued]").type(userInfo[2])
        cy.get("#company").select('1').should("have.value", "1")
        cy.contains("Create this computer").click()
    })
})

function createUser() {
    let ano = new Date().getFullYear().toString();
    let mes = new Date().getMonth().toString();
    let dia = new Date().getDay().toString();

    let name = "Macbook"
    
    if(mes<10){
        mes = 0+mes
    }
    else{
       mes
    }

    if(dia<10){
        dia = 0+dia
    }
    else{
       dia
    }
    
    let introduced = 2005 + "-"+  mes + "-"   + dia
    let discontinued = ano + "-" +  mes + "-"   + dia

    let user_info = [name, introduced, discontinued ]

    cy.get('#name').type(name)
    cy.get('#introduced').type(introduced)
    cy.get('#discontinued').type(discontinued)
    cy.get("#company").select('1').should("have.value", "1")
    cy.contains("Create this computer").click()

    
    return user_info;
}