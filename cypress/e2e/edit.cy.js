it('should correctly edit an user', () => {
    // given
    const newUser = getRandomUser()

    // when
    cy.get('[name=firstName]').clear().type(newUser.firstName)
    cy.get('[name=lastName]').clear().type(newUser.lastName)
    cy.get('[name=email]').clear().type(newUser.email)
    cy.get('.btn-primary').click()

    // then
    cy.get('.alert').should('have.text', 'Updating user successful')
    cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('exist')
    cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')

    cy.request({
        method: 'GET',
        url: `http://localhost:4001/users/${user.username}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((resp) => {
        const body = resp.body
        expect(body.username).to.eq(user.username)
        expect(body.roles).to.deep.equal(user.roles)
        expect(body.firstName).to.eq(newUser.firstName)
        expect(body.lastName).to.eq(newUser.lastName)
        expect(body.email).to.eq(newUser.email)
    })
})
