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
  const [sort, setSort] = useState<string>('ascending');
  const [filter, setFilter] = useState<string[] | null>(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sortResults = (books: Book[], orientation: string) => {
    if(orientation === 'descending') {
      return books.sort((a, b) => b.title.localeCompare(a.title))
    } else {
      return books.sort((a, b) => a.title.localeCompare(b.title))
    }
  }

  const filterResults = (books: Book[], filter: string[]) => {
    if(!filter.length) {
      return books
    } else {

    }

  }

  
  const fetchData = async () => {
    try {
      const searchData = await getResults(searchTerm);
      // const filteredData = filterResults(searchData, filter);
      //pass filtered data to sortResutls on line below
      const sortedData = sortResults(searchData, sort);
      setResults(sortedData);
    } catch(error: any) {
      setError(`There was a problem getting the search results - ${error.message}`)
    }
  }
  
  useEffect(() => {
    setError('')
    fetchData()
  }, [sort])

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
        {/* <h2 className='results-header'>{`Search Results - ${searchTerm}`}</h2> */}
        <h2 className='results-header'>{`Search Results - ${useParams().term}`}</h2>
        <div className='results-container'>
          <section className='sort-filter'>
            <SearchCtrl setSort={setSort} setFilter={setFilter} filter={filter}/>
          </section>
          <section className='results-gallery'>
            {books}
          </section>
        </div>
        </>
    )
}

export default Results