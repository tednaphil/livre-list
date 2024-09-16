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
  const shelfID: string | undefined = useParams().id;
  // const [user, setUser] = useState<string | null>(null);
  const [shelf, setShelf] = useState<Bookshelf | undefined>();
  const [books, setBooks] = useState<Book[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // setError('')
    //move sessionUser statements to separate useEffect
    // const sessionUser = sessionStorage.getItem('userID')
    // setUser(sessionUser)
    const fetchData = async (): Promise<void> => {
      try {
        const sessionUser: string | null = sessionStorage.getItem('userID')
        const shelfData: any[] | undefined = await getShelf(sessionUser, shelfID);
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
    fetchData()
  }, [shelfID])


  const bookCards = books?.map((book: Book): React.ReactNode => {
    return(
      <Card
        key={book.id}
        id={book.id}
        title={book.title}
        authors={book.authors}
        image={book.image_links ? book.image_links.smallThumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQakHOfrZN4cKsNq6Lpu9L435U9q4l3OJMA&s'}
      />
    )
  })

  const handleDelete = (shelfID: string | undefined): void => {
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