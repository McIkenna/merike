import React, { useState } from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import { green, red, grey } from '@mui/material/colors'
import ProductForm from './ProductForm'
import { useSelector } from 'react-redux'
import { UserInventory } from './UserInventory'
import { useGetProductBySellerQuery } from '../../../api/services/productApi'
import Carousel from 'react-material-ui-carousel'
import Banner from '../../layout/Banner'
import CarouselForm from './CarouselForm'
import BannerForm from './BannerForm'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { colors } from '../../../utils/Themes'

export const AdminDashboard = () => {
    const { stateStore, auth } = useSelector(state => state);
    const { user } = auth
    const { categories } = stateStore
    const { data, isError, isSuccess, isFetching, isLoading, refetch } = useGetProductBySellerQuery(user?._id)
   const userPage = {
    UserInventory: 'Inventory',
    CarouselManagement: 'Carousel Management',
    BannerManagement: 'Banner Management',
   }
    const [activePage, setActivePage] = useState('UserInventory')
      const changePage = (e) => {
        const { name } = e.target
        setActivePage(name)
    }

    // console.log('activePage -->', activePage)   

    const [toastState, setToastState] = useState({
            open: false,
            message: '',
            severity: ''
        });
    return (
        <Box>
            <Box>
                            <Snackbar open={toastState.open} autoHideDuration={1200} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                <Alert
                                    severity={toastState.severity}
                                    variant="filled"
                                    sx={{ width: '100%' }}
                                >
                                    {toastState.message}
                                </Alert>
                            </Snackbar>
                        </Box>
            <Grid container spacing={2}>
                <Grid item sm={2} md={2} xl={2}>
                    <Box
                        sx={{
                            backgroundColor: 'background.paper',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                        }}>
                        {
                            Object.entries(userPage)?.map(([key, page]) =>
                                <Button sx={{
                                    margin: '10px',
                                    backgroundColor: activePage === key ? 'primary.dark': colors.neutral.gray,
                                    color: activePage === key ? 'text.light' : colors.neutral.darkGray,
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'text.black'
                                    }
                                    
                                }}
                                    textAlign={'center'}
                                    padding={'10px'}
                                    borderRadius={'10px'}
                                    name={key}
                                    onClick={changePage}>
                                        {page}
                                </Button>
                            )
                        }



                    </Box>




                </Grid>
                <Grid item sm={10} md={10} xl={10}>
                   { activePage === 'UserInventory' && <Box>
                        <UserInventory setToastState={setToastState} toastState={toastState} categories={categories} user={user} data={data} isFetching={isFetching} refetch={refetch}/>
                    </Box>}
                    { activePage === 'CarouselManagement' && <Box>
                        <CarouselForm setToastState={setToastState} toastState={toastState}/>
                    </Box>}

                    { activePage === 'BannerManagement' && <Box>
                        <BannerForm setToastState={setToastState} toastState={toastState}/>
                    </Box>}
                </Grid>

            </Grid>
        </Box>
    )
}
