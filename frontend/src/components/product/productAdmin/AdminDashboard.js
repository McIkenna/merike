import React, { useState } from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import { green, red, grey } from '@mui/material/colors'
import ProductForm from './ProductForm'
import { useSelector } from 'react-redux'
import { UserInventory } from './UserInventory'
import { useGetProductBySellerQuery } from '../../../api/services/productApi'

export const AdminDashboard = () => {
    const { stateStore, auth } = useSelector(state => state);
    const { user } = auth
    const { categories } = stateStore
    const { data, isError, isSuccess, isFetching, isLoading, refetch } = useGetProductBySellerQuery(user?._id)
   const userPage = {
    UserInventory: 'Inventory'
   }
    const [activePage, setActivePage] = useState('UserInventory')
      const changePage = (e) => {
        const { name } = e.target
        // console.log('e -->', e.target)
        setActivePage(name)
    }
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item sm={2} md={2} xl={2}>
                    <Box
                        sx={{
                            backgroundColor: grey['100'],
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                        }}>
                        {
                            Object.entries(userPage)?.map(([key, page]) =>
                                <Button sx={{
                                    margin: '10px',
                                    backgroundColor: grey['400']
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
                        <UserInventory categories={categories} user={user} data={data} isFetching={isFetching} refetch={refetch}/>
                    </Box>}
                </Grid>

            </Grid>
        </Box>
    )
}
