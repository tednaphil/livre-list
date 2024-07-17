import './Results.css';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getResults } from '../Util/API_calls';

function Results() {
  // const searchTerm = useParams().term;
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state);
  const [results, setResults] = useState([]);
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

    return(
        <>
          <h2>Search Results</h2>
          <h3>{searchTerm}</h3>
        </>
    )
}

export default Results