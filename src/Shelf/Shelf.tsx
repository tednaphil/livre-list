import './Shelf.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bookshelf, Book } from '../Util/Interfaces';
import { getShelf } from '../Util/API_calls';
import Card from '../Card/Card';
import { Button } from '@chakra-ui/react';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loading from '../Loading/Loading';

function Shelf() {
  const shelfID = useParams().id;
  // const [user, setUser] = useState(null);
  //get user data from sessionstorage or local storage
  const [shelf, setShelf] = useState<Bookshelf | undefined>();
  const [books, setBooks] = useState<Book[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // setError('')
    fetchData()
  }, [shelfID])

  const fetchData = async () => {
    try {
      const shelfData = await getShelf("userID", shelfID);
      if(shelfData) {
        setShelf(shelfData[0])
        setBooks(shelfData[1])
        setLoading(false)
      }
    } catch(error: any) {
      setError(`There was a problem getting the shelf data - ${error}`)
      setLoading(false)
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

  const handleDelete = (shelfID: string | undefined) => {
    //PLACEHOLDER
    alert(`Shelf ${shelfID} will be deleted`)
    //invoke network request to delete shelf
    navigate('/shelves');
  }

    return(
      <>
      {error && <ErrorPage error={error}/>}
      {loading && <Loading/>}
      {!loading && <>
        <div className='shelf-wrapper'>
          <aside className='shelf-details'>
            {shelf && <h2>{shelf.title}</h2>}
            <Button colorScheme='orange'
            onClick={() => {handleDelete(shelfID)}}>Delete Shelf</Button>
          </aside>
          <div className='book-gallery'>
            {bookCards}
          </div>
        </div>
      </>}
      </>
    )
}

export default Shelf