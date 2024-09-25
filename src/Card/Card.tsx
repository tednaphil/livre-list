import './Card.css';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  title: string;
  authors: string[];
  image: string;
}

function Card({id, title, authors, image}: Props) {

    const author = (): JSX.Element => {
      if(authors.length > 1) {
        return <p className='author'>{`${authors[0]} et al.`}</p>
      } else if(!authors) {
        return <p className='author'>No Author Listed</p>
      } else {
        return <p className='author'>{authors[0]}</p>
      }
    }

    return(
        <>
        <div className='card book-card'>
          <Link to={`/books/${id}`}>
            <img src={image} alt={`${title} book cover`}/>
            <h3>{title}</h3>
            {author()}
          </Link>
        </div>
        </>
    )
}

export default Card