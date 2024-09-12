import './AlertBar.css'
import { motion } from "framer-motion";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
} from '@chakra-ui/react';

interface Props {
    message: string
}

function AlertBar ({message}: Props) {
    return (
        <>
        <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01]
              }}>
            <Alert status='success'>
            <AlertIcon />
            <Box>
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                {message}
                </AlertDescription>
            </Box>
            </Alert>
            </motion.div>
        </>
    )
}

export default AlertBar