import './Results.css';
import { Book } from '../Util/Interfaces';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getResults } from '../Util/API_calls';
import Card from '../Card/Card';
import SearchCtrl from '../SearchCtrl/SearchCtrl';

function Results() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state);
  const [results, setResults] = useState<Book[]>([]);
  const [direction, setDirection] = useState<string>('ascending');
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sortResults = (books: Book[], orientation: string) => {
    if(orientation === 'descending') {
      //return results sorted in descending alphabetical order
      return books.sort((a, b) => b.title.localeCompare(a.title))
    } else {
      //return array of results sorted in ascending alphabetical order
      return books.sort((a, b) => a.title.localeCompare(b.title))
    }
  }

  
  const fetchData = async () => {
    try {
      const searchData = await getResults(searchTerm);
      const sortedData = sortResults(searchData, direction);
      setResults(sortedData);
    } catch(error: any) {
      setError(`There was a problem getting the search results - ${error.message}`)
    }
  }
  
  useEffect(() => {
    setError('')
    fetchData()
  }, [direction])

  const books = results?.map(book => {
    // console.log('books map', book)
    return (
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
        <h2 className='results-header'>{`Search Results - ${searchTerm}`}</h2>
        <div className='results-container'>
          <section className='sort-filter'>
            <SearchCtrl setDirection={setDirection} results={results}/>
          </section>
          <section className='results-gallery'>
            {books}
          </section>
        </div>
        </>
    )
}

export default Results