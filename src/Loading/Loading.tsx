import './Loading.css';
import { Spinner } from '@chakra-ui/react';

function Loading() {
    return(
      <div className='loading'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='orange.500'
        size='xl'
        />
        <h2>Loading</h2>
    </div>
    )
}

export default Loading