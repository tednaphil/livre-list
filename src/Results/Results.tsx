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
  const [filters, setFilters] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  enum FilterValues {
    purchaseable = 'purchaseable',
    fiction = 'Fiction',
    nonFiction = 'Nonfiction',
    childrens = 'Juvenile'
  };

  //books parameter has type any since the method toSorted throws an error when called on Book[] type
  const sortResults = (books: any, orientation: string) => {
    if(orientation === 'descending') {
      return books.toSorted((a: Book, b: Book) => b.title.localeCompare(a.title))
    } else {
      return books.toSorted((a: Book, b: Book) => a.title.localeCompare(b.title))
    }
  }

  const filterResults = (books: Book[], filters: string[] | null) => {
    const purchaseableBooks = books.filter(book => book.buy_link)
    if(!filters?.length) {
      return books
    }

    if(filters.includes(FilterValues.purchaseable)) {
      //define filteredBooks array initialized with purchaseableBooks
      //make copy of filters array with just the genre filters (remove purchaseable filter)
      //if genreFilters has length
        //iterate through genre filters
          //check filteredBooks array - if a book's categories property doesn't contain the current filter, remove it from array
        //return filteredBooks array
      //return filteredBooks (this will be executed if genrefilters has no length)
      const booksToFilter = [...purchaseableBooks]
      let filteredBooks = purchaseableBooks;
      const genreFilters = filters.filter(filter => filter !== FilterValues.purchaseable);
      console.log({genreFilters})
      // console.log('Juvenile Fiction'.includes('Nonfiction'))
      if(genreFilters.length) {
        for (const filter of genreFilters) {
          booksToFilter.forEach(book => {
            console.log({filter})
            console.log(book.categories)
            if(!book.categories.some((category) => category.includes(filter))) {
              filteredBooks.splice(filteredBooks.indexOf(book), 1)
            }
          })
        }
        console.log({filteredBooks})
        return filteredBooks
      }
      // console.log({filteredBooks})
      return filteredBooks
    } else if(!filters.includes(FilterValues.purchaseable)) {
      //define filteredBooks array initialized with books
      //iterate through filters
          //check filteredBooks array - if a book's categories property doesn't contain the current filter, remove it from array
      //return filteredBooks array
      // console.log('Juvenile Fiction'.includes('Nonfiction'))
      const booksToFilter = [...books];
      let filteredBooks = [...books];
      // for (const book of filteredBooks) {
      //   filters.forEach(filter => {
      //     if(!book.categories.some((category) => category.includes(filter))) {
      //       filteredBooks.splice(filteredBooks.indexOf(book), 1)
      //     }
      //   })
      // }
      for (const filter of filters) {
        console.log({filteredBooks})
        // console.log({filter})
        booksToFilter.forEach(book => {
          console.log({filteredBooks})
          console.log(book.title, book.categories)
          console.log('at least one category includes the filter', book.categories.some((category) => category.includes(filter)))
          console.log('categories don\'t include the filter', !book.categories.some((category) => category.includes(filter)))
          if(!book.categories.some((category) => category.includes(filter))) {
            console.log('remove this book', book)
            filteredBooks.splice(filteredBooks.indexOf(book), 1)
            console.log(filteredBooks)
          }
        })
      }
      console.log('returned books', filteredBooks)
      return filteredBooks
    }
  }

  // const filterResults = (books: Book[], filters: string[] | null) => {
  //   if(!filters?.length) {
  //     return books
  //   }
  //   return filters.reduce((acc: Book[], filter: string) => {
  //     if(filter === FilterValues.purchaseable) {
  //       const purchaseable = books.filter(book => book.buy_link);
  //       purchaseable.forEach(book => {
  //         if(!acc.includes(book)) {
  //           acc.push(book)
  //         }
  //       })
  //     }
  //     else {
  //       const genreFiltered = books.filter(book => book.categories.some((category) => category.includes(filter)));
  //       console.log({genreFiltered})
  //       genreFiltered.forEach(book => {
  //         if(!acc.includes(book)) {
  //           acc.push(book)
  //         }
  //       })
  //     }
  //     return acc
  //   }, [])
  // }

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
      setLoading(false)
    } catch(error: any) {
      setError(`There was a problem getting the search results - ${error.message}`)
      setLoading(false)
    }
  }

  const sortedFilteredBooks = () => {
    const filteredData = filterResults(results, filters);
    const sortedData = sortResults(filteredData, sort);
    const books = sortedData?.map((book: Book) => {
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
    return books.length ? books : <p>No results</p>
  }
  
  useEffect(() => {
    setError('')
    setLoading(true)
    setResults([])
    fetchData()
  }, [term])

  useEffect(() => {
    // setLoading(true)
  }, [filters, sort])


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
              {sortedFilteredBooks()}
            </section>
          </div>
        </>}
        </>
    )
}

export default Results