import ShelfCtrl from '../ShelfCtrl/ShelfCtrl';
import './Shelves.css';

function Shelves() {
    return(
        <>
          <div className='shelves-wrapper'>
            <section className='sort-filter'>
              <ShelfCtrl/>
            </section>
            <section className='shelves-gallery'>
              Shelves Gallery
            </section>
          </div>
        </>
    )
}

export default Shelves