import './Results.css';
import { useParams } from 'react-router-dom';

function Results() {
  const searchTerm = useParams().term;

    return(
        <>
          <h2>Search Results</h2>
          <h3>{searchTerm}</h3>
        </>
    )
}

export default Results