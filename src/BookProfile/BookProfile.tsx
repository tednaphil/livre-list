import './BookProfile.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book } from '../Util/Interfaces';
import { getBook } from '../Util/API_calls';
import { Button } from '@chakra-ui/react';
import Card from '../Card/Card';

function BookProfile() {
    const id = useParams().id;
    const [book, setBook] = useState<Book | null>(null);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [recs, setRecs] = useState<Book[] | null>(null);


    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
        //fetch reccommendations based on data.category[0]
      } catch(error: any) {
        setError(`There was a problem getting the book - ${error.message}`)
      }
    }

    const authors = book?.authors.map((author) => {
      //if length === 1 return author with space at end
      //if length > 1 return author with comma and space at end
      return (
        <p>{author}</p>
      )
    })


    return(
        <>
          <div className='profile-wrapper'>
          <section className='book-profile'>
            <aside className='thumbnail-container'>
              <img src={book?.image_links.extraLarge} alt={`${book?.title} cover`}/>
              <Button colorScheme='orange'>Add to Shelf</Button>
            </aside>
            <article className='book-info'>
              <h3>{book?.title}</h3>
              <hr/>
              <section className='book-details'>
                {authors}
                <p>{`| ${book?.publisher} | Published: ${book?.published_date}`}</p>
              </section>
              <p>{book?.description}</p>
            </article>
          </section>
          <section className='recs'>
            <h4>Recommendations</h4>
            {/* render reccommendation cards carousel here */}
          </section>
          </div>
        </>
    )
}

export default BookProfile