import './Nav.css';
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
import Search from '../Search/Search';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

function Nav() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState(null);
    return(
        <>
          <nav className='navbar'>
              <Link to='/'><h1>LivreList</h1></Link>
              <Search/>
              <Button /*ref={btnRef}*/ colorScheme='whiteAlpha' variant='ghost' onClick={onOpen}>
                <HamburgerIcon w={6} h={6} color='white' />
              </Button>
              <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>

                <DrawerBody>
                    <Stack>
                        <NavLink to='/' onClick={onClose}>Home</NavLink>
                        <NavLink to='/shelves' onClick={onClose}>Shelves</NavLink>
                        {!user && <Button colorScheme='orange'>Login with Google</Button>}
                    </Stack>
                </DrawerBody>
                </DrawerContent>
              </Drawer>
            </nav>
        </>
    )
}

export default Nav