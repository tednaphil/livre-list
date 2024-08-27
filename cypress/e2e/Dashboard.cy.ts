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
  })
  it('Displays landing page', () => {
    cy.visit('http://localhost:3000')
    .get('h1').contains('LivreList')
    .get('input[type="text"]').should('have.attr', 'placeholder').should('eq', 'search')
  })
  it('Shows search results', () => {

  })
  it('Filters and sorts search results', () => {

  })
  it('Displays book profile', () => {

  })
  it('Displays results when initiating a search from a different page', () => {

  })
})