import ShelfCtrl from '../ShelfCtrl/ShelfCtrl';
import './Shelves.css';
import { useState, useEffect } from 'react';
import { Bookshelf } from '../Util/Interfaces';
import { getShelves } from '../Util/API_calls';
import ShelfCard from '../ShelfCard/ShelfCard';

function Shelves() {
  const [shelves, setShelves] = useState<Bookshelf[] | null>(null);
  // const [user, setUser] = useState()
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getShelves()
      setShelves(response)
    } catch(error: any) {
      setError(`There was a problem getting the shelves - ${error}`)
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
          <div className='shelves-wrapper'>
            <section className='sort-filter'>
              <ShelfCtrl shelves={shelves} setShelves={setShelves} />
            </section>
            <section className='shelves-gallery'>
              {shelfNames}
            </section>
          </div>
        </>
    )
}

export default Shelves