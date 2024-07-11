import './App.css';
import { useRef } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack
} from '@chakra-ui/react'
import Home from '../Home/Home';
import Search from '../Search/Search';
import Results from '../Results/Results';
import BookProfile from '../BookProfile/BookProfile';
import Shelves from '../Shelves/Shelves';
import Shelf from '../Shelf/Shelf';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
    <nav className='navbar'>
      <h1>LivreList</h1>
      <Search/>
      <Button /*ref={btnRef}*/ onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            {/* <div className='navlinks'> */}
            <Stack>
              <NavLink to='/' onClick={onClose}>Home</NavLink>
              <NavLink to='/shelves' onClick={onClose}>Shelves</NavLink>
            </Stack>
            {/* </div> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>


      {/* <div className='navlinks'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/shelves'>Shelves</NavLink>
      </div> */}
    </nav>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shelves' element={<Shelves/>}/>
      <Route path='/shelves/:shelfname' element={<Shelf/>}/>
      <Route path='/search/:term' element={<Results/>}/>
      <Route path='/books/:title' element={<BookProfile/>}/>
      <Route path='*' element={<ErrorPage />}/>
    </Routes>
    </>
  );
}

export default App;
