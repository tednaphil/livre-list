import './Shelf.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bookshelf, Book } from '../Util/Interfaces';

function Shelf() {
  const shelfID = useParams().id;
  const [shelf, setShelf] = useState<Bookshelf | null>(null);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');


  //fetch shelf dataset to state

    return(
        <div className='shelf-wrapper'>
          <h2>Shelf</h2>
          <h3>{shelfID}</h3>
        </div>
    )
}

export default Shelf