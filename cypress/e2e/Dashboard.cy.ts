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
    .get('a[href="/books/IJDQwQEACAAJ"]').click()
    .url().should('eq', 'http://localhost:3000/books/IJDQwQEACAAJ')
    .get('img[src="http://books.google.com/books/content?id=IJDQwQEACAAJ&printsec=frontcover&img=1&zoom=5&imgtk=AFLRE73Gv-VWWoL9fRKwvNfCUBg8Ekpuu2bzh8-zcdm4cTBTCqDXRIOV89m0Y0lavCS83LmAonJSpyzoTOcAYRZ53sjczkzIFBxFinpcVNKjMxeX_BHv6EcAe2hv7gkdyfE94LLmTsn8&source=gbs_api"]').should('have.attr', 'alt').should('equal', 'How to Celebrate Halloween! cover')
    .get('h3').contains('How to Celebrate Halloween!')
    .get('.book-details').contains('p', 'P.K. Hallinan')
    .get('.book-details').contains('p', 'Sky Pony | Published: 2019')
    .get('.book-info').contains('p', 'Encourage safe yet exciting Halloween fun for your child')
    .get('.chakra-menu__menu-button').click()
    .get('button[id="menu-list-:r7:-menuitem-:r9:"]').contains('Favorites')
    .get('button[id="menu-list-:r7:-menuitem-:rb:"]').contains('For the Culture')
    .get('button[id="menu-list-:r7:-menuitem-:rd:"]').contains('Create a New Shelf')
    .get('.chakra-button').contains('Buy Book').should('not.exist')
    .get('h4').contains('Recommendations')
    .get('.slick-prev').should('be.visible')
    .get('.slick-next').should('be.visible')
    .get('div[data-index="0"]').contains('h3', 'Celebrate the Season: Home for the Holidays')
    .get('div[data-index="0"]').contains('p', 'Taylor Garland')
    .get('img[src="http://books.google.com/books/content?id=4IA3swEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"]').should('have.attr', 'alt').should('equal', 'Celebrate the Season: Home for the Holidays book cover')
    .get('.slick-next').click()
    .get('div[data-index="4"]').contains('h3', 'Holidays at Roselands. [With Plates.]')
    .get('div[data-index="4"]').contains('p', 'Martha Finley')
    .get('img[src="http://books.google.com/books/content?id=yhk6TPU3j3IC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"]').should('have.attr', 'alt').should('equal', 'Holidays at Roselands. [With Plates.] book cover')
  })
  it('Displays buy button for purchaseable books', () => {
    cy.visit('http://localhost:3000/books/FTpsDwAAQBAJ')
    .get('img[src="http://books.google.com/books/content?id=FTpsDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"]').should('have.attr', 'alt').should('equal', 'Llewellyn\'s Little Book of Halloween cover')
    .get('h3').contains('Llewellyn\'s Little Book of Halloween')
    .get('.book-details').contains('p', 'Mickie Mueller')
    .get('.book-details').contains('p', 'Llewellyn Worldwide | Published: 2018')
    .get('.book-info').contains('p', 'This fun, pocket-size book shares everything you need to know to celebrate the festival')
    .get('.chakra-menu__menu-button').click()
    .get('button[id="menu-list-:r7:-menuitem-:r9:"]').contains('Favorites')
    .get('button[id="menu-list-:r7:-menuitem-:rb:"]').contains('For the Culture')
    .get('button[id="menu-list-:r7:-menuitem-:rd:"]').contains('Create a New Shelf')
    .get('.chakra-button').contains('Buy Book')
    .get('h4').contains('Recommendations')
    .get('.slick-prev').should('be.visible')
    .get('.slick-next').should('be.visible')
    .get('div[data-index="0"]').contains('h3', 'Celebrate the Season: Home for the Holidays')
    .get('div[data-index="0"]').contains('p', 'Taylor Garland')
    .get('img[src="http://books.google.com/books/content?id=4IA3swEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"]').should('have.attr', 'alt').should('equal', 'Celebrate the Season: Home for the Holidays book cover')
    .get('.slick-next').click()
    .get('div[data-index="4"]').contains('h3', 'Holidays at Roselands. [With Plates.]')
    .get('div[data-index="4"]').contains('p', 'Martha Finley')
    .get('img[src="http://books.google.com/books/content?id=yhk6TPU3j3IC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"]').should('have.attr', 'alt').should('equal', 'Holidays at Roselands. [With Plates.] book cover')
  })
  it('Displays results when initiating a search from a different page', () => {
    cy.visit('http://localhost:3000/books/IJDQwQEACAAJ')
    cy.get('input[type="text"]').type('christmas{enter}')
    .url().should('eq', 'http://localhost:3000/search/christmas')
    .get('h2').contains('Search Results - christmas')
    .get('.results-gallery').children().should('have.length', 10)
    .get('.card').first().contains('h3', 'A Visit from St. Nicholas, Or, The Night Before Christmas')
    .get('.card').first().contains('p', 'Lowell Swortzell')
    .get('img').first().should('have.attr', 'alt').should('equal', 'A Visit from St. Nicholas, Or, The Night Before Christmas book cover')
    .get('.card').last().contains('h3', 'WinterSong')
    .get('.card').last().contains('p', 'Madeleine L\'Engle')
    .get('.card').last().contains('p', 'Luci Shaw')
    .get('img').last().should('have.attr', 'alt').should('equal', 'WinterSong book cover')
  })
  it('Displays message if no results match filter criteria', () => {
    cy.get('input[type="text"]').type('christmas{enter}')
    .get('.chakra-checkbox__control').click()
  })
})