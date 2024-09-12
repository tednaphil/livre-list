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
  Stack,
} from '@chakra-ui/react'
import Search from '../Search/Search';
import AlertBar from '../AlertBar/AlertBar';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { postUser } from '../Util/API_calls';

function Nav() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const sessionUser: string | null = sessionStorage.getItem('userID')
    const [user, setUser] = useState<string | null>(sessionUser);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const navigate = useNavigate();


    const login = async (): Promise<void> => {
      try {
        //TO DO: uncomment block below to replace hardcoded lines
        // const response = await postUser();
        // console.log(response)
        // sessionStorage.setItem('userID', response)
        // setUser(response)
        sessionStorage.setItem('userID', '106196942824430802445')
        setUser('106196942824430802445')
        setShowAlert(true);
        setTimeout(() => {
          onClose()
        }, 2800)
        // onClose()
      } catch(error: any) {
        console.log(error)
      }
    }

    const logout = (): void => {
      sessionStorage.removeItem('userID')
      setUser(null)
      navigate('/');
      setShowAlert(true)
      setTimeout(() => {
        onClose()
      }, 2800)
    }

    useEffect(() => {
      if(showAlert) {
        setTimeout(() => {
          setShowAlert(false)
        }, 2500)
      }
    }, [showAlert])

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
              <Button colorScheme='whiteAlpha' variant='ghost' onClick={onOpen}>
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
                        {user && <NavLink to='/shelves' onClick={onClose}>Shelves</NavLink>}
                        {!user && <Button colorScheme='orange' onClick={login}>Login with Google</Button>}
                        {user && <Button colorScheme='orange' onClick={logout}>Logout</Button>}
                        {showAlert && <AlertBar message='Successful operation'/>}
                    </Stack>
                </DrawerBody>
                </DrawerContent>
              </Drawer>
            </nav>
        </>
    )
}

export default Nav