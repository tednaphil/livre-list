import './Results.css';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getResults } from '../Util/API_calls';
import Card from '../Card/Card';

function Results() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state);
  const [results, setResults] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const searchData = await getResults(searchTerm);
      setResults(searchData);
    } catch(error: any) {
      setError(`There was a problem getting the search results - ${error.message}`)
    }
  }

  const books = results?.map(book => {
    console.log('books map', book)
    return (
      <Card
        key={book.id}
        id={book.id}
        title={book.title}
        authors={book.authors}
        image={book.image_links.smallThumbnail}
      />
    )
  })

    return(
        <>
          <h2>{`Search Results - ${searchTerm}`}</h2>
          {books}
        </>
    )
}

export default Results