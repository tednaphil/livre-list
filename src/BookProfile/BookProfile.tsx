import './BookProfile.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book, Bookshelf } from '../Util/Interfaces';
import { getBook, getShelves, getRecs } from '../Util/API_calls';
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import { Button, Stack } from '@chakra-ui/react';
import Carousel from '../Carousel/Carousel';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loading from '../Loading/Loading';


import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

function BookProfile() {
    const id = useParams().id;
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ name: 'Odell', id: "106196942824430802445" });
    // get user data from local storage
    const [shelves, setShelves] = useState<string[] | null>(null);
    const [error, setError] = useState('');
    const [recs, setRecs] = useState<Book[] | null>(null);


    useEffect(() => {
      setBook(null);
      setRecs(null);
      setError('');
      fetchData()
    }, [id])

    const fetchData = async () => {
      setLoading(true)
      try {
        const shelfData = await getShelves(user.id);
        setShelves(shelfData.map((shelf: Bookshelf) => shelf.title))
        const data = await getBook(id);
        if(!data.image_links) {
          data.image_links = {smallThumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQakHOfrZN4cKsNq6Lpu9L435U9q4l3OJMA&s'}
        };
        data.published_date = data.published_date.slice(0, 4);
        setBook(data);
        if(data) {
          const recData = await getRecs(data.categories[0]);
          recData.forEach((book: any) => {
            if(!book.image_links) {
              book.image_links = {smallThumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQakHOfrZN4cKsNq6Lpu9L435U9q4l3OJMA&s'}
           }
          })
          setRecs(recData.filter((rec: Book) => rec.title !== data.title))
        }
        setLoading(false)
      } catch(error: any) {
        setError(`There was a problem getting the book data - ${error.message}`)
        setLoading(false)
      }
    }

    const authors = book?.authors.map((author, index) => {
      //if length === 1 return author with space at end
      //if length > 1 return author with comma and space at end
      return (
        <p key={index}>{author}</p>
      )
    })

    const userShelves = shelves?.map((shelf, index) => {
      return(
        <MenuItem key={index} onClick={() => alert(`Added to ${shelf}`)}>{shelf}</MenuItem>
      )
    })

    return(
        <>
          {error && <ErrorPage error={error}/>}
          {loading && <Loading/>}
          {!loading && <div className='profile-wrapper'>
          <section className='book-profile'>
            <aside className='thumbnail-container'>
              <img src={book?.image_links.smallThumbnail} alt={`${book?.title} cover`}/>
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
            <Carousel books={recs}/>
          </footer>
          </div>}
        </>
    )
}

export default BookProfile