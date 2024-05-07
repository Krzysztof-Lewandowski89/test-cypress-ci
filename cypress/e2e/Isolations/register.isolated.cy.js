/// <reference types="cypress" />


import { alerts } from "../../components/alert"
import { getRandomUser } from "../../generators/userGenerator"
import { registerMocks } from "../../mocks/postSignUp"
import { registerPage } from "../../pages/registerPage"

describe('Register tests in isolation', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        //given
        const user = getRandomUser()
        registerMocks.mockSuccess()

        //when
        registerPage.attemptRegister(user)

        //then
        alerts.verifySuccess()
        cy.url().should('contain', '/login')
    })

})