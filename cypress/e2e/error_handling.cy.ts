describe('Error Handling Spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('Displays error page if page not found', () => {
    cy.visit('localhost:3000/badpath')
    .get('h2').contains('Uh oh!')
    .get('p').contains('Page Not Found')
    .get('button').contains('Go Home').click()
    .url().should('equal', 'http://localhost:3000/')
    .get('img').should('have.attr', 'alt').should('equal', 'illustration of book spines')
    .get('.home-info').contains(`Welcome to LivreList – Your Ultimate Book Organizer!`)
  })
  it('Displays error if server error received', () => {
    cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books?search=halloween"
      , {
        statusCode: 500,
      }).as('getResultsServerError') 
    cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books/IJDQwQEACAAJ"
      , {
        statusCode: 500,
      }).as('getBookServerError') 
    cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books?search=Juvenile%20Fiction%20/%20Holidays%20&%20Celebrations%20/%20Halloween"
      , {
        statusCode: 500,
      }).as('getRecsServerError') 
    cy.intercept("GET", "https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/vi/users/106196942824430802445/bookshelves"
      , {
        statusCode: 200,
        fixture: "shelves",
      }).as('getShelves')

    cy.get('input[type="text"]').type('halloween{enter}')
    .get('.error-page').contains('There was a problem getting the search results - Couldn\'t get search results - 500')

    cy.visit('http://localhost:3000/books/IJDQwQEACAAJ')
    .get('.error-page').contains('There was a problem getting the book data - Couldn\'t get the book - 500')
  })
  it('Displays error if book not found', () => {
    cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books/IJDQwQEACAAJ"
      , {
        statusCode: 404,
      }).as('bookNotFound')
    cy.intercept("GET", "https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/vi/users/106196942824430802445/bookshelves"
      , {
        statusCode: 200,
        fixture: "shelves",
      }).as('getShelves')

    cy.visit('http://localhost:3000/books/IJDQwQEACAAJ')
    .get('.error-page').contains('There was a problem getting the book data - Couldn\'t get the book - 404')
    })
  // it('Displays error if book recommendations not received', () => {
  //   cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books/IJDQwQEACAAJ"
  //     , {
  //       statusCode: 200,
  //       fixture: 'book_response'
  //     }).as('getBook') 
  //   cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books?search=Juvenile%20Fiction%20/%20Holidays%20&%20Celebrations%20/%20Halloween"
  //     , {
  //       statusCode: 500,
  //     }).as('getRecsServerError')
  //   cy.visit('http://localhost:3000/books/IJDQwQEACAAJ')
  // })
  })