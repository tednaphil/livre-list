describe('template spec', () => {
  it('displays error componenet', () => {
    cy.visit('localhost:3000/badpath')
    .get('h2').contains('Uh oh!')
  })
})