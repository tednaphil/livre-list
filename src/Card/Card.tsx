import './Card.css';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  title: string;
  authors: string[];
  image: string;
}

function Card({id, title, authors, image}: Props) {

  const authorList = authors.map(author => {
    return(
      <p>{author}</p>
    )});

    return(
        <>
          <img src={image} alt={`${title} book cover`}/>
          <h3>{title}</h3>
          <p>Author(s)</p>
          {authorList}
        </>
    )
}

export default Card