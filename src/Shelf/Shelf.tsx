import './Shelf.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bookshelf, Book } from '../Util/Interfaces';
import { getShelf } from '../Util/API_calls';
import Card from '../Card/Card';

function Shelf() {
  const shelfID = useParams().id;
  // const [user, setUser] = useState(null);
  //get user data from sessionstorage or local storage
  // const [shelf, setShelf] = useState<Bookshelf | null>(null);
  const [shelf, setShelf] = useState<any | undefined>();
  const [books, setBooks] = useState<any | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // setError('')
    fetchData()
  }, [shelfID])

  const fetchData = async () => {
    try {
      const shelfData = await getShelf("userID", shelfID);
      // const [shelfData, booksData] = await getShelf("userID", shelfID);
      // console.log(shelfData)
      if(shelfData) {
        setShelf(shelfData[0])
        setBooks(shelfData[1])
      }
      // setBooks(shelf[1])
      // setShelf(shelf[0])
    } catch(error: any) {
      setError(`There was a problem getting the shelf data - ${error}`)
    }
  }

  const bookCards = books?.map((book: Book) => {
    return(
      <Card
        key={book.id}
        id={book.id}
        title={book.title}
        authors={book.authors}
        image={book.image_links.smallThumbnail}
        book={book}
      />
    )
  })

    return(
      <>
        <div className='shelf-wrapper'>
          {shelf && <h2>{shelf.title}</h2>}
          {/* delete shelf button */}
          <div className='book-gallery'>
            {bookCards}
          </div>
        </div>
      </>
    )
}

export default Shelf