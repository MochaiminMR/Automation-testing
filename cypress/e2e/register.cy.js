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
    cy.visit('http://localhost:5173/register')
  })

  it('should display login page correctly', () => {
    // verifikasi eleemen yang harus ada pada login
    cy.get('input[placeholder="Username"]').should('be.visible')
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible')
  })

  it('should display alert when username is empty', () => {
    // isi password
    cy.get('input[placeholder="Email"]').type('moci@gmail.com')
    cy.get('input[placeholder="Password"]').type('cimin123')

    // klik tombol button tanpa username
    cy.get('button')
      .contains(/^Register$/)
      .click()

    // verifikasi window alert untuk menampilkan pesan dari API
    cy.on('window:alert', str => {
      expect(str).to.equal('"username" is not allowed to be empty')
    })
  })
  it('should display alert when email is empty', () => {
    // isi password
    cy.get('input[placeholder="Username"]').type('cimin')
    cy.get('input[placeholder="Password"]').type('cimin123')

    // klik tombol button tanpa email
    cy.get('button')
      .contains(/^Register$/)
      .click()

    // verifikasi window alert untuk menampilkan pesan dari API
    cy.on('window:alert', str => {
      expect(str).to.equal('"email" is not allowed to be empty')
    })
  })

  it('should display alert when password is empty', () => {
    // mengisi username
    cy.get('input[placeholder="Username"]').type('cimin')
    cy.get('input[placeholder="Email"]').type('moci@gmail.com')
    // klik button tanpa password
    cy.get('button')
      .contains(/^Register$/)
      .click()

    // verifikasi alert
    cy.on('window:alert', str => {
      expect(str).to.equal('"password" is not allowed to be empty')
    })
  })

  it('should display alert when email already have', () => {
    // mengisi username & password
    cy.get('input[placeholder="Username"]').type('moci')
    cy.get('input[placeholder="Email"]').type('moci@gmail.com')
    cy.get('input[placeholder="Password"]').type('cimin123')

    // klik button login
    cy.get('button')
      .contains(/^Register$/)
      .click()

    // verifikasi alert
    cy.on('window:alert', str => {
      expect(str).to.equal('email is already taken')
    })
  })

  it('should display login when email not taken', () => {
    // mengisi username & password
    cy.get('input[placeholder="Username"]').type('bacul')
    cy.get('input[placeholder="Email"]').type('baculoa0@gmail.com')
    cy.get('input[placeholder="Password"]').type('cimin123')

    // klik button login
    cy.get('button')
      .contains(/^Register$/)
      .click()

    cy.get('button').contains('Login').should('be.visible')
  })
})
