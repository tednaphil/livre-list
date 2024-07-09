import './BookProfile.css';
import { useParams } from 'react-router-dom';

function BookProfile() {
    const bookTitle = useParams().title;
    return(
        <>
          <h2>Book Profile</h2>
          <h3>{bookTitle}</h3>
        </>
    )
}

export default BookProfile