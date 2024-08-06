import './Shelf.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bookshelf, Book } from '../Util/Interfaces';
import { getShelf } from '../Util/API_calls';

function Shelf() {
  const shelfID = useParams().id;
  // const [user, setUser] = useState(null);
  //get user data from sessionstorage or local storage
  // const [shelf, setShelf] = useState<Bookshelf | null>(null);
  const [shelf, setShelf] = useState<any | undefined>();
  // const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // getShelf("userID", shelfID)
    // getShelfBooks("userID", shelfID)
    setError('')
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const shelfData = await getShelf("userID", shelfID);
      // const [shelfData, booksData] = await getShelf("userID", shelfID);
      // console.log(shelfData)
      setShelf(shelfData)
      // setBooks(shelf[1])
    } catch(error: any) {
      setError(`There was a problem getting the shelf data - ${error}`)
    }
  }


  //fetch shelf dataset to state

    return(
        <div className='shelf-wrapper'>
          <h2>Shelf</h2>
          <h3>{shelfID}</h3>
        </div>
    )
}

export default Shelf