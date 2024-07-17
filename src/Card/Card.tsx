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
      <p>{author}</p>
    )});

    return(
        <>
        <Link to={`/books/${title}`}>
          <img src={image} alt={`${title} book cover`}/>
          <h3>{title}</h3>
          {/* <p>Author(s)</p> */}
          {authorList}
        </Link>
        </>
    )
}

export default Card