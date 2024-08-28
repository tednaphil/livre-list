describe('General User Stories Spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books?search=halloween"
      , {
        statusCode: 200,
        fixture: "halloween_response",
      }).as('searchHalloween') 
    cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books?search=christmas"
      , {
        statusCode: 200,
        fixture: "christmas_response",
      }).as('searchChristmas') 
    cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books/IJDQwQEACAAJ"
      , {
        statusCode: 200,
        fixture: "book_response",
      }).as('getBook') 
    cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books?search=Juvenile Fiction / Holidays %26 Celebrations / Halloween"
      , {
        statusCode: 200,
        fixture: "recommendations_response",
      }).as('getRecs') 
    cy.visit('http://localhost:3000')
  })
  it('Displays landing page', () => {
    cy.get('h1').contains('LivreList')
    .get('input[type="text"]').should('have.attr', 'placeholder').should('eq', 'search')
    .get('button').should('be.visible')
    .get('img').should('have.attr', 'alt').should('equal', 'illustration of book spines')
    .get('.home-info').contains(`Welcome to LivreList – Your Ultimate Book Organizer!`)
  })
  it('Shows search results', () => {
    cy.get('input[type="text"]').should('have.value', '').type('halloween').should('have.value', 'halloween')
    .type('{enter}')
    .url().should('eq', 'http://localhost:3000/search/halloween')
    .get('h2').contains('Search Results - halloween')
    .get('.sort-filter').contains('Sort')
    .get('select').should('have.value', 'ascending')
    .get('.sort-filter').contains('Filter')
    .get('input[type="checkbox"]').should('have.value', 'purchaseable')
    .get('.results-gallery').children().should('have.length', 10)
    .get('.card').first().contains('h3', 'Clifford\'s First Halloween')
    .get('.card').first().contains('p', 'Norman Bridwell')
    .get('img').first().should('have.attr', 'alt').should('equal', 'Clifford\'s First Halloween book cover')
    .get('.card').last().contains('h3', 'Witches, Pumpkins, and Grinning Ghosts')
    .get('.card').last().contains('p', 'Edna Barth')
    .get('img').last().should('have.attr', 'alt').should('equal', 'Witches, Pumpkins, and Grinning Ghosts book cover')
  })
  it('Filters and sorts search results', () => {
    cy.get('input[type="text"]').type('halloween{enter}')
    .get('select').select('descending')
    .get('.card').first().contains('h3', 'Witches, Pumpkins, and Grinning Ghosts')
    .get('.card').first().contains('p', 'Edna Barth')
    .get('img').first().should('have.attr', 'alt').should('equal', 'Witches, Pumpkins, and Grinning Ghosts book cover')
    .get('.card').last().contains('h3', 'Clifford\'s First Halloween')
    .get('.card').last().contains('p', 'Norman Bridwell')
    .get('img').last().should('have.attr', 'alt').should('equal', 'Clifford\'s First Halloween book cover')
    .get('.chakra-checkbox__control').click()
    .get('.results-gallery').children().should('have.length', 7)
    .get('.card').first().contains('h3', 'Mommy, Why Don\'t We Celebrate Halloween?')
    .get('.card').first().contains('p', 'Linda Winwood')
    .get('img').first().should('have.attr', 'alt').should('equal', 'Mommy, Why Don\'t We Celebrate Halloween? book cover')
    .get('.card').last().contains('h3', 'Clifford\'s First Halloween')
    .get('.card').last().contains('p', 'Norman Bridwell')
    .get('img').last().should('have.attr', 'alt').should('equal', 'Clifford\'s First Halloween book cover')
  })
  it('Displays book profile', () => {
    cy.get('input[type="text"]').type('halloween{enter}')

  })
  it('Displays results when initiating a search from a different page', () => {

  })
})