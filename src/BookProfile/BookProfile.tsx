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
    const id: string | undefined = useParams().id;
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<null | string>(null);
    const [shelves, setShelves] = useState<string[] | null>(null);
    const [error, setError] = useState<string>('');
    const [recsError, setRecsError] = useState<string>('');
    const [recs, setRecs] = useState<Book[] | null>(null);


    useEffect(() => {
      setBook(null);
      setRecs(null);
      setError('');
      const sessionUser: string | null = sessionStorage.getItem('userID');
      setUser(sessionUser)
      const fetchData = async (): Promise<void> => {
        setLoading(true)
        try {
          const data: Book = await getBook(id);
          if(!data.image_links) {
            data.image_links = {smallThumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQakHOfrZN4cKsNq6Lpu9L435U9q4l3OJMA&s'}
          };
          data.published_date = data.published_date.slice(0, 4);
          setBook(data);
          if(data) {
            const recData: Book[] = await getRecs(data.categories[0]);
            setRecs(recData.filter((rec: Book) => rec.title !== data.title))
          }
          setLoading(false)
        } catch(error: any) {
          if(error.message.includes('recommendations')) {
            setRecsError(error.message)
            setLoading(false)
          } else{
            setError(`There was a problem getting the book data - ${error.message}`)
            setLoading(false)
          }
        }
      }
      fetchData()
    }, [id])

    useEffect(() => {
      if(user) {
        fetchShelves(user)
      }
    }, [user])

    const fetchShelves = async (userID: string | null) : Promise<void> => {
      try {
        const shelfData: Bookshelf[] = await getShelves(userID);
        setShelves(shelfData.map((shelf: Bookshelf) => shelf.title))
      } catch(error: any) {
        setError(error.message)
      }
    }

    const authors: React.ReactNode | React.ReactNode[] = book?.authors ? book?.authors.map((author, index) => {
      //if length === 1 return author with space at end
      //if length > 1 return author with comma and space at end
      return (
        <p key={index}>{author}</p>
      )
    }) : <p>No Author Listed</p>

    const userShelves: React.ReactNode | React.ReactNode[] = shelves?.map((shelf, index) => {
      return(
        <MenuItem key={index} onClick={() => alert(`Added to ${shelf}`)}>{shelf}</MenuItem>
      )
    })

    const login = async () : Promise<void> => {
      try {
        //TO DO: uncomment block below to replace hardcoded lines
        // const response = await postUser();
        // console.log(response)
        // sessionStorage.setItem('userID', response)
        // setUser(response)
        sessionStorage.setItem('userID', '106196942824430802445')
        setUser('106196942824430802445')
      } catch(error: any) {
        console.log(error)
      }
    }

    return(
        <>
          {error && <ErrorPage error={error}/>}
          {loading && <Loading/>}
          {!loading && !error && <div className='profile-wrapper'>
          <section className='book-profile'>
            <aside className='thumbnail-container'>
              <img src={book?.image_links.smallThumbnail} alt={`${book?.title} cover`}/>
              <Stack spacing={4} direction='column' align='center'>
                {!user && <Button colorScheme='orange' width='200px' onClick={login}>Login to add to shelf</Button>}
                {user && <Menu>
                  <MenuButton as={Button} colorScheme='orange' width='200px' rightIcon={<ChevronDownIcon />}>
                    Add to Shelf
                  </MenuButton>
                  <MenuList>
                    {userShelves}
                    <MenuItem icon={<AddIcon />} onClick={() => {alert('create a new shelf')}}>Create a New Shelf</MenuItem>
                  </MenuList>
                </Menu>}
                {book?.buy_link && <Button colorScheme='orange' width='200px'><a target="_blank" rel="noreferrer" href={book.buy_link}>Buy Book</a></Button>}
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
            <h4 className='recs-header'>Recommendations</h4>
            {recsError ? <ErrorPage error={recsError}/> : <Carousel books={recs}/>}
            
          </footer>
          </div>}
        </>
    )
}

export default BookProfile