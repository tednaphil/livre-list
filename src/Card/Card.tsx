import './Card.css';
import { Link } from 'react-router-dom';
import { Book } from '../Util/Interfaces';

interface Props {
  id: string;
  title: string;
  authors: string[];
  image: string;
  book: Book;
}

function Card({id, title, authors, image, book}: Props) {

  const authorList = authors.map(author => {
    return(
      <p className='author'>{author}</p>
    )});

    return(
        <>
        <div className='book-card'>
          <Link to={`/books/${id}`}>
            <img src={image} alt={`${title} book cover`}/>
            <h3>{title}</h3>
            {/* <p>Author(s)</p> */}
            {authorList}
          </Link>
        </div>
        </>
    )
}

export default Card