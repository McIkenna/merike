import { useState } from 'react'
import { Grid, Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { UserInventory } from './UserInventory'
import { useGetProductBySellerQuery } from '../../../api/services/productApi'
import CarouselManagement from './CarouselManagement'
import BannerManagement from './BannerManagement'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { colors } from '../../../utils/Themes';
import PromoCodeForm from './PromoCodeForm'

export const AdminDashboard = () => {
    const { stateStore, auth } = useSelector(state => state);
    const { user } = auth
    const { categories,bannerItems, carouselItems } = stateStore
    const { data, isFetching, refetch } = useGetProductBySellerQuery(user?._id)
   const userPage = {
    UserInventory: 'Inventory',
    CarouselManagement: 'Carousel Management',
    BannerManagement: 'Banner Management',
    PromoManagement: 'Promo Management',
   }
    const [activePage, setActivePage] = useState('UserInventory')
      const changePage = (e) => {
        const { name } = e.target

        console.log('name -->', name)
        setActivePage(name)
    }

    console.log('activePage -->', activePage)   

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
                                <Button 
                                key={key}
                            sx={{
                                    margin: '10px',
                                    backgroundColor: activePage === key ? 'primary.dark': 'background.default',
                                    color: activePage === key ? 'text.light' : 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'text.black'
                                    },
                                    padding: '10px',
                                    textAlign: 'center'
                                    
                                }}
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
                        <CarouselManagement setToastState={setToastState} toastState={toastState} carouselItems={carouselItems}/>
                    </Box>}

                    { activePage === 'BannerManagement' && <Box>
                        <BannerManagement setToastState={setToastState} toastState={toastState} bannerItems={bannerItems}/>
                    </Box>}
                     { activePage === 'PromoManagement' && <Box>
                        <PromoCodeForm setToastState={setToastState} toastState={toastState}/>
                    </Box>}
                </Grid>

            </Grid>
        </Box>
    )
}
