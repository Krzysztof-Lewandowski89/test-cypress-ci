
Cypress.Commands.add('login', (username, password) => {
    // 1. request http na logowanie
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin', // baseUrl is prepend to URL
        body: {
            username: username,
            password: password,
        },
    }).then((resp) => {
        // 2a Ustawiamy odpowiedz w localstorage
        localStorage.setItem('user', JSON.stringify(resp.body))
        // 2b ustawiamy token z odpowiedzi w ciastku token
        cy.setCookie('token', resp.body.token)
    })
    cy.visit('http://localhost:8081')
})

Cypress.Commands.add('register', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
    })
})


   
  