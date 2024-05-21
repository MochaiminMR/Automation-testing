/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login Spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('should display login page correctly', () => {
    // verifikasi eleemen yang harus ada pada login
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible')
  })

  it('should display alert when email is empty', () => {
    // isi passwor
    cy.get('input[placeholder="Password"]').type('cimin123')

    // klik tombol button tanpa username
    cy.get('button')
      .contains(/^Login$/)
      .click()

    // verifikasi window alert untuk menampilkan pesan dari API
    cy.on('window:alert', str => {
      expect(str).to.equal('"email" is not allowed to be empty')
    })
  })

  it('should display alert when password is empty', () => {
    // mengisi username
    cy.get('input[placeholder="Email"]').type('moci@gmail.com')
    // klik button tanpa password
    cy.get('button')
      .contains(/^Login$/)
      .click()

    // verifikasi alert
    cy.on('window:alert', str => {
      expect(str).to.equal('"password" is not allowed to be empty')
    })
  })

  it('should display alert when email & password wrong', () => {
    // mengisi username & password
    cy.get('input[placeholder="Email"]').type('cimin@gmail.com')
    cy.get('input[placeholder="Password"]').type('hayu123')

    // klik button login
    cy.get('button')
      .contains(/^Login$/)
      .click()

    // verifikasi alert
    cy.on('window:alert', str => {
      expect(str).to.equal('email or password is wrong')
    })
  })

  it('should display homepage when email and password are correct', () => {
    // mengisi username & password
    cy.get('input[placeholder="Email"]').type('moci@gmail.com')
    cy.get('input[placeholder="Password"]').type('cimin123')

    // klik button login
    cy.get('button').contains(/^Login$/).click()

    cy.get('button').contains('Sign Out').should('be.visible')
  })
})
