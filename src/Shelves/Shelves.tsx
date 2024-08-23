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
  const [sort, setSort] = useState('ascending');
  // const [user, setUser] = useState(null)
  // get user data from local storage
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const sortShelves = (shelves: Bookshelf[], orientation: string) => {
    if(orientation === 'descending') {
      return shelves.sort((a, b) => b.title.localeCompare(a.title))
    } else {
      return shelves.sort((a, b) => a.title.localeCompare(b.title))
    }
  }

  useEffect(() => {
    fetchData()
  }, [sort])

  const fetchData = async () => {
    try {
      const response = await getShelves();
      const sortedData = sortShelves(response, sort);
      setShelves(sortedData)
      setLoading(false)
    } catch(error: any) {
      setError(`There was a problem getting the shelves - ${error}`)
      setLoading(false)
    }
  }

  const shelfNames = shelves?.map((shelf) => {
    return(
      <ShelfCard
      key={shelf.id}
      title={shelf.title}
      id={shelf.id}
      bookCount={shelf.book_count}
      />
    )
  })

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
              {shelfNames}
            </section>
          </div>
        </>}
        </>
    )
}

export default Shelves