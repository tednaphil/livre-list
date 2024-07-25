import './BookProfile.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book } from '../Util/Interfaces';
import { getBook } from '../Util/API_calls';
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import { Button, Stack,  } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import Card from '../Card/Card';

function BookProfile() {
    const id = useParams().id;
    const [book, setBook] = useState<Book | null>(null);
    // const [loading, setLoading] = useState(true);
    const [shelves, setShelves] = useState<string[]>([`Bellamy's Favs`, `DNF`, `Christmas Stories`])
    const [error, setError] = useState('');
    const [recs, setRecs] = useState<Book[] | null>(null);


    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
        //fetch reccommendations based on data.category[0]
        //fetch user's shelves and set the shelves state with an array of shelf names
      } catch(error: any) {
        setError(`There was a problem getting the book - ${error.message}`)
      }
    }

    const authors = book?.authors.map((author) => {
      //if length === 1 return author with space at end
      //if length > 1 return author with comma and space at end
      return (
        <p>{author}</p>
      )
    })

    const userShelves = shelves.map(shelf => {
      return(
        <MenuItem onClick={() => alert(`Added to ${shelf}`)}>{shelf}</MenuItem>
      )
    })


    return(
        <>
          <div className='profile-wrapper'>
          <section className='book-profile'>
            <aside className='thumbnail-container'>
              <img src={book?.image_links.extraLarge} alt={`${book?.title} cover`}/>
              <Stack spacing={4} direction='column' align='center'>
                <Menu>
                  <MenuButton as={Button} colorScheme='orange' width='200px' rightIcon={<ChevronDownIcon />}>
                    Add to Shelf
                  </MenuButton>
                  <MenuList>
                    {userShelves}
                    <MenuItem icon={<AddIcon />} onClick={() => {alert('create a new shelf')}}>Create a New Shelf</MenuItem>
                  </MenuList>
                </Menu>
                {/* <Button colorScheme='orange' width='200px'>Add to Shelf</Button> */}
                {book?.buy_link && <Button colorScheme='orange' width='200px'>Buy Book</Button>}
              </Stack>
            </aside>
            <article className='book-info'>
              <h3>{book?.title}</h3>
              <hr/>
              <section className='book-details'>
                {authors}
                <p>{`| ${book?.publisher} | Published: ${book?.published_date}`}</p>
              </section>
              <p>{book?.description}</p>
            </article>
          </section>
          <footer className='recs'>
            <h4>Recommendations</h4>
            {/* render reccommendation cards carousel here */}
          </footer>
          </div>
        </>
    )
}

export default BookProfile