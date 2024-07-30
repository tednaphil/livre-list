import './Shelf.css';
import { useParams } from 'react-router-dom';

function Shelf() {
  const shelfName = useParams().shelfname;
    return(
        <div className='shelf-wrapper'>
          <h2>Shelf</h2>
          <h3>{shelfName}</h3>
        </div>
    )
}

export default Shelf