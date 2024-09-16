import './Card.css';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  title: string;
  authors: string[];
  image: string;
}

function Card({id, title, authors, image}: Props) {

  const authorList: React.ReactNode | React.ReactNode[] = authors ? authors.map((author, index) => {
    return(
      <p className='author' key={index}>{author}</p>
    )}) :
    <p className='author'>No Author Listed</p>

    return(
        <>
        <div className='card book-card'>
          <Link to={`/books/${id}`}>
            <img src={image} alt={`${title} book cover`}/>
            <h3>{title}</h3>
            {authorList}
          </Link>
        </div>
        </>
    )
}

export default Card