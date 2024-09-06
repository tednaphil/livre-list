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
        cy.intercept("GET", "https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/vi/users/106196942824430802445/bookshelves/1001"
          , {
            statusCode: 200,
            fixture: "bookshelf",
          }).as('getShelf') 
        cy.intercept("GET", "https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/vi/users/106196942824430802445/bookshelves/1001/books"
          , {
            statusCode: 200,
            fixture: "bookshelf_books",
          }).as('getShelfBooks') 
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
    it('Displays and sorts a user\'s bookshelves', () => {
        cy.get('button').click()
        .get('.chakra-button').contains('Login with Google').click()
        .get('a[href="/shelves"]').contains('Shelves').click()
        .get('.shelves-gallery').children().should('have.length', 2)
        .get('.card').first().contains('h3', 'Favorites')
        .get('.card').first().contains('p', '0 Books')
        .get('img').first().should('have.attr', 'alt').should('equal', 'illustration of book spines')
        .get('.card').last().contains('h3', 'For the Culture')
        .get('.card').last().contains('p', '5 Books')
        .get('img').last().should('have.attr', 'alt').should('equal', 'illustration of book spines')
        .get('.sort-filter').contains('Sort')
        .get('select').should('have.value', 'ascending').select('descending')
        .get('.card').first().contains('h3', 'For the Culture')
        .get('.card').first().contains('p', '5 Books')
        .get('img').first().should('have.attr', 'alt').should('equal', 'illustration of book spines')
        .get('.card').last().contains('h3', 'Favorites')
        .get('.card').last().contains('p', '0 Books')
        .get('img').last().should('have.attr', 'alt').should('equal', 'illustration of book spines')
        .get('.sort-filter').contains('Create a New Shelf')
        .get('input.chakra-input.css-1cjy4zv').should('have.attr', 'placeholder').should('eq', 'Loaned Books')
        .get('.chakra-button').contains('Submit')
    })
    // it('Allows user to create a new shelf from Shelves page', () => {

    // })
    it('Displays a bookshelve\'s books', () => {
        cy.get('button').click()
        .get('.chakra-button').contains('Login with Google').click()
        .get('a[href="/shelves"]').contains('Shelves').click()
        .get('.card').last().click()
        .get('h2').contains('For the Culture')
        .get('button').contains('Delete Shelf').should('be.visible')
        .get('.book-gallery').children().should('have.length', 5)
        .get('.card').first().contains('h3', 'The Wealth Cure')
        .get('.card').first().contains('p', 'Hill Harper')
        .get('img').first().should('have.attr', 'alt').should('equal', 'The Wealth Cure book cover')
        .get('.card').last().contains('h3', 'The Color Purple')
        .get('.card').last().contains('p', 'Alice Walker')
        .get('img').last().should('have.attr', 'alt').should('equal', 'The Color Purple book cover')
    })
    // it('Allows a user to remove a book from a bookshelf', () => {

    // })
    // it('Allows a user to delete a bookshelf', () => {

    // }) 
    it('Logs a user out', () => {
        cy.get('button').click()
        .get('.chakra-button').contains('Login with Google').click()
        .get('.chakra-button').contains('Logout').click()
        .get('.chakra-button').contains('Logout').should('not.exist')
        .get('.chakra-button').contains('Login with Google').should('be.visible')
    })
})