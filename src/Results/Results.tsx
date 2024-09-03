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
  const [sortedResults, setSortedResults] = useState<Book[]>([]);
  const [sort, setSort] = useState<string>('ascending');
  const [filters, setFilters] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sortResults = (books: Book[], orientation: string) => {
    if(orientation === 'descending') {
      return books.sort((a, b) => b.title.localeCompare(a.title))
    } else {
      return books.sort((a, b) => a.title.localeCompare(b.title))
    }
  }

  const filterResults = (books: Book[], filters: string[] | null) => {
    if(!filters?.length) {
      return books
    } else {
      return filters.reduce((acc: Book[], filter) => {
        if(filter === 'purchaseable') {
          const purchaseable = books.filter(book => book.buy_link);
          acc = [...acc, ...purchaseable]
        }
        // else if(filter === 'ebook') {
        //   // const ebooks = books.filter(book => book.categories.some((category) => category.includes(filter)))
        // }
        else {
          const genreFiltered = books.filter(book => book.categories.some((category) => category.includes(filter)));
          console.log({genreFiltered})
          acc = [...acc, ...genreFiltered]
        }
        return acc
      }, [])

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
      const sortedData = sortResults(searchData, sort);
      setResults(sortedData);
      // const filteredData = filterResults(searchData, filters);
      // setResults(sortedData);
      setLoading(false)
    } catch(error: any) {
      setError(`There was a problem getting the search results - ${error.message}`)
      setLoading(false)
    }
  }

  const handleCriteria = () => {
    const filteredData = filterResults(results, filters);
    const sortedData = sortResults(filteredData, sort);
    setSortedResults(sortedData);
  }
  
  useEffect(() => {
    setError('')
    // setLoading(true)
    setResults([])
    fetchData()
  }, [term])

  // useEffect(() => {
  //   handleCriteria()
  // }, [filters, sort])

  const books = results?.map(book => {
    return (
      <Card
        key={book.id}
        id={book.id}
        title={book.title}
        authors={book.authors}
        image={book.image_links ? book.image_links.smallThumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQakHOfrZN4cKsNq6Lpu9L435U9q4l3OJMA&s'}
        book={book}
      />
    )
  })
  // const books = sortedResults.length > 0 ? sortedResults.map(book => {
  //   return (
  //     <Card
  //       key={book.id}
  //       id={book.id}
  //       title={book.title}
  //       authors={book.authors}
  //       image={book.image_links ? book.image_links.smallThumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQakHOfrZN4cKsNq6Lpu9L435U9q4l3OJMA&s'}
  //       book={book}
  //     />
  //   )
  // }) : results.map(book => {
  //   return (
  //     <Card
  //       key={book.id}
  //       id={book.id}
  //       title={book.title}
  //       authors={book.authors}
  //       image={book.image_links ? book.image_links.smallThumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQakHOfrZN4cKsNq6Lpu9L435U9q4l3OJMA&s'}
  //       book={book}
  //     />
  //   )
  // })


    return(
        <>
        {loading && <Loading/>}
        {!loading && 
        <>
          <h2 className='results-header'>{`Search Results - ${term}`}</h2>
          <div className='results-container'>
            <section className='sort-filter'>
              <SearchCtrl setSort={setSort} setFilters={setFilters} filters={filters}/>
            </section>
            <section className='results-gallery'>
              {error && <ErrorPage error={error}/>}
              {!results.length && <p>No Results</p>}
              {books}
            </section>
          </div>
        </>}
        </>
    )
}

export default Results