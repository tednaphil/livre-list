import './ShelfCard.css';
import { Link } from 'react-router-dom';
import { Book } from '../Util/Interfaces';
import shelflogo from '../Images/bookspines.jpg';

interface Props {
  id: number;
  title: string;
  bookCount: number;
}

function ShelfCard({id, title, bookCount}: Props) {

    return(
        <>
        <div className='shelf-card card'>
          <Link to={`/shelves/${id}`}>
            <img src={shelflogo} alt={`illustration of book spines`}/>
            <h3>{title}</h3>
          </Link>
        </div>
        </>
    )
}

export default ShelfCard