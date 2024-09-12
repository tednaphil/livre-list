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
            <Alert status='success'>
            <AlertIcon />
            <Box>
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                {message}
                </AlertDescription>
            </Box>
            </Alert>
        </>
    )
}

export default AlertBar