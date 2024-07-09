import './Shelf.css';
import { useParams } from 'react-router-dom';

function Shelf() {
  const shelfName = useParams().shelfname;
    return(
        <>
          <h2>Shelf</h2>
          <h3>{shelfName}</h3>
        </>
    )
}

export default Shelf