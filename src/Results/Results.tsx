import './Results.css';
import { Book } from '../Util/Interfaces';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getResults } from '../Util/API_calls';
import Card from '../Card/Card';
import SearchCtrl from '../SearchCtrl/SearchCtrl';
import Loading from '../Loading/Loading';
import ErrorPage from '../ErrorPage/ErrorPage';

function Results() {
  const term = useParams().term;
  const [results, setResults] = useState<Book[]>([]);
  const [sort, setSort] = useState<string>('ascending');
  const [filter, setFilter] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
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
      const searchData = await getResults(term);
      searchData.forEach((book: any) => {
        if(!book.image_links) {
          book.image_links = {smallThumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQakHOfrZN4cKsNq6Lpu9L435U9q4l3OJMA&s'}
       }
      })
      // const filteredData = filterResults(searchData, filter);
      //pass filtered data to sortResutls on line below
      const sortedData = sortResults(searchData, sort);
      setResults(sortedData);
      console.log(sortedData)
      setLoading(false)
    } catch(error: any) {
      setError(`There was a problem getting the search results - ${error.message}`)
      setLoading(false)
    }
  }
  
  useEffect(() => {
    setError('')
    fetchData()
  }, [filter, sort, term])

  const books = results?.map(book => {
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
        {error && <ErrorPage error={error}/>}
        {loading && <Loading/>}
        {!loading && 
        <>
          <h2 className='results-header'>{`Search Results - ${term}`}</h2>
          <div className='results-container'>
            <section className='sort-filter'>
              <SearchCtrl setSort={setSort} setFilter={setFilter} filter={filter}/>
            </section>
            <section className='results-gallery'>
              {books}
            </section>
          </div>
        </>}
        </>
    )
}

export default Results