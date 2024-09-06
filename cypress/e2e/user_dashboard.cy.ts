describe('Logged-in User Stories Spec', () => {
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
        cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books/FTpsDwAAQBAJ"
          , {
            statusCode: 200,
            fixture: "purchaseable_book_response",
          }).as('getPurchaseableBook') 
        cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books?search=Juvenile%20Fiction%20/%20Holidays%20&%20Celebrations%20/%20Halloween"
          , {
            statusCode: 200,
            fixture: "recommendations_response",
          }).as('getRecs') 
        cy.intercept("GET", "https://livre-list-be-c61f46345338.herokuapp.com/api/v1/books?search=Body,%20Mind%20&%20Spirit"
          , {
            statusCode: 200,
            fixture: "recommendations_response",
          }).as('getRecs') 
        cy.intercept("GET", "https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/vi/users/106196942824430802445/bookshelves"
          , {
            statusCode: 200,
            fixture: "shelves",
          }).as('getShelves') 
        cy.visit('http://localhost:3000')
      })
    it('Logs a user in', () => {
        cy.get('button').should('be.visible').click()
        .get('.chakra-button').contains('Login with Google').click()
        .get('.chakra-button').contains('Login with Google').should('not.exist')
        .get('a[href="/shelves"]').contains('Shelves').should('be.visible')
        .get('.chakra-button').contains('Logout').should('be.visible')
    })
    it('Allows user to login from book profile', () => {
        cy.get('input[type="text"]').type('halloween{enter}')
        .get('a[href="/books/IJDQwQEACAAJ"]').click()
        .get('.chakra-button').contains('Login to add to shelf').should('be.visible').click()
        .get('.chakra-button').contains('Login to add to shelf').should('not.exist')
        .get('.chakra-menu__menu-button').should('be.visible').click()
        .get('button[id="menu-list-:r7:-menuitem-:rb:"]').contains('Favorites')
        .get('button[id="menu-list-:r7:-menuitem-:rd:"]').contains('For the Culture')
        .get('button[id="menu-list-:r7:-menuitem-:r9:"]').contains('Create a New Shelf')
    })
    it('Displays shelves option in book profile menu', () => {
        cy.get('button').should('be.visible').click()
        .get('.chakra-button').contains('Login with Google').click()
        .get('.chakra-modal__close-btn').click()
        .get('input[type="text"]').type('halloween{enter}')
        .get('a[href="/books/IJDQwQEACAAJ"]').click()
        .get('.chakra-menu__menu-button').click()
        .get('button[id="menu-list-:rd:-menuitem-:rf:"]').contains('Favorites')
        .get('button[id="menu-list-:rd:-menuitem-:rh:"]').contains('For the Culture')
        .get('button[id="menu-list-:rd:-menuitem-:rj:"]').contains('Create a New Shelf')
    })
    // it('Allows user to add a book to a shelf', () => {

    // })
    // it('Allows user to create a new shelf from a book profile menu', () => {

    // })
    // it('Displays a user\'s bookshelves', () => {
        
    // })
    // it('Allows user to create a new shelf from Shelves page', () => {

    // })
    // it('Displays a bookshelve\'s books', () => {
      
    // })
    // it('Allows a user to remove a book from a bookshelf', () => {

    // })
    // it('Logs a user out', () => {

    // })
})