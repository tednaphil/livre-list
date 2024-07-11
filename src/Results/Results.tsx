import './Results.css';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Results() {
  // const searchTerm = useParams().term;
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state);
  const [results, setResults] = useState([]);

  // useEffect(() => {
  //   fetch the search results and assign them to results state
  // }, [])

    return(
        <>
          <h2>Search Results</h2>
          <h3>{searchTerm}</h3>
        </>
    )
}

export default Results