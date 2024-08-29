import './ErrorPage.css';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props {
  error: string
}

function ErrorPage({error} : Props) {
    return(
        <article className='error-page'>
          <h2>Uh oh!</h2>
          <p>{error}</p>
          {error === 'Page Not Found' && <Button colorScheme='orange'><Link to='/'>Go Home</Link></Button>}
        </article>
    )
}

export default ErrorPage
