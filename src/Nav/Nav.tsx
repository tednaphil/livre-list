import './Nav.css';
import { motion } from "framer-motion";
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
import { getUser } from '../Util/API_calls';

function Nav() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState(null);


    return(
        <>
          <nav className='navbar'>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
              }}>
                <Link to='/'><h1>LivreList</h1></Link>
              </motion.div>
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
                        {!user && <Button colorScheme='orange' onClick={getUser}>Login with Google</Button>}
                    </Stack>
                </DrawerBody>
                </DrawerContent>
              </Drawer>
            </nav>
        </>
    )
}

export default Nav