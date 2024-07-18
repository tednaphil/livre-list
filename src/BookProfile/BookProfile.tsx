import './BookProfile.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book } from '../Util/Interfaces';
import { getBook } from '../Util/API_calls';
import { Button } from '@chakra-ui/react';

function BookProfile() {
    const id = useParams().id;
    const [book, setBook] = useState<Book | null>(null);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch(error: any) {
        setError(`There was a problem getting the book - ${error.message}`)
      }
    }

    const authors = book?.authors.map((author) => {
      return (
        <p>{author}</p>
      )
    })


    return(
        <>
          {/* <h2>Book Profile</h2> */}
          {/* <h3>{id}</h3> */}
          <section className='book-profile'>
            <aside className='thumbnail-container'>
              <img src={book?.image_links.extraLarge} alt={`${book?.title} cover`}/>

            </aside>
            <article className='book-info'>
              <h3>{book?.title}</h3>
              <hr/>
              <section className='book-details'>
                {authors}
                <p>{`| ${book?.publisher} | Published: ${book?.published_date}`}</p>
              </section>
              {book?.description}
            </article>
          </section>
        </>
    )
}

export default BookProfile