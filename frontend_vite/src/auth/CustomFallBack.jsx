import { Box } from '@mui/material'
import ModernLoader from '../utils/ModernLoader.jsx'

export const CustomFallBack = () => {
    return (<Box
        display="block"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
        <ModernLoader variant='list' count={1} />
        <ModernLoader variant='grid' count={12} />

    </Box>)
}