import './AlertBar.css'
import { motion } from "framer-motion";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from '@chakra-ui/react';

interface Props {
    message: string
}

function AlertBar ({message}: Props) {
    return (
        <>
            <Alert status='success'>
                <AlertIcon />
                {message}
            </Alert>
        </>
    )
}

export default AlertBar