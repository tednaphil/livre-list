import ShelfCtrl from '../ShelfCtrl/ShelfCtrl';
import './Shelves.css';
import { useState, useEffect } from 'react';
import { Bookshelf } from '../Util/Interfaces';
import { getShelves } from '../Util/API_calls';
import ShelfCard from '../ShelfCard/ShelfCard';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loading from '../Loading/Loading';

function Shelves() {
  const [shelves, setShelves] = useState<Bookshelf[] | null>(null);
  const [sort, setSort] = useState<string>('ascending');
  // const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const sortShelves = (shelves: any, orientation: string): Bookshelf[] => {
    if(orientation === 'descending') {
      return shelves.toSorted((a: Bookshelf, b: Bookshelf) => b.title.localeCompare(a.title))
    } else {
      return shelves.toSorted((a: Bookshelf, b: Bookshelf) => a.title.localeCompare(b.title))
    }
  }

  useEffect(() => {
    // const sessionUser = sessionStorage.getItem('userID')
    // setUser(sessionUser)
    setError('')
    const fetchData = async (): Promise<void> => {
      try {
        const sessionUser: string | null = sessionStorage.getItem('userID')
        const response: Bookshelf[] = await getShelves(sessionUser);
        // const sortedData: Bookshelf[] = sortShelves(response, sort);
        setShelves(response)
        setLoading(false)
      } catch(error: any) {
        setError(`There was a problem getting the shelves - ${error}`)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // const shelfNames: React.ReactNode = shelves?.map((shelf: Bookshelf) => {
  //   return(
  //     <ShelfCard
  //     key={shelf.id}
  //     title={shelf.title}
  //     id={shelf.id}
  //     bookCount={shelf.book_count}
  //     />
  //   )
  // })

  const sortedShelves = (shelves: Bookshelf[] | null) => {
    if(shelves) {
      const sorted = sortShelves(shelves, sort);
      return sorted.map((shelf: Bookshelf) => {
        return(
          <ShelfCard
          key={shelf.id}
          title={shelf.title}
          id={shelf.id}
          bookCount={shelf.book_count}
          />
        )
      })
    }
  };

    return(
        <>
        {error && <ErrorPage error={error}/>}
        {loading && <Loading/>}
        {!loading && <>
          <div className='shelves-wrapper'>
            <section className='sort-filter'>
              <ShelfCtrl setSort={setSort} />
            </section>
            <section className='shelves-gallery'>
              {/* {shelfNames} */}
              {sortedShelves(shelves)}
            </section>
          </div>
        </>}
        </>
    )
}

export default Shelves