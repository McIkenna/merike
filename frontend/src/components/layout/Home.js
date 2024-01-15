import React, {useEffect} from 'react'
import BoxCard from '../../utils/BoxCard'
import {Grid, Box} from '@mui/material';
import MetaData from '../../utils/MetaData';
import { useGetAllProductQuery } from '../../api/services/productApi';
import { useDispatch } from 'react-redux';
export default function Home() {
    
    useDispatch()
    const { data: products, error: prodError, isLoading: prodIsLoading, isSuccess:prodIsSuccess } = useGetAllProductQuery();
   
    console.log('products-->', products)
  return (
    <Box>
        <MetaData title={'Buy Best Products Online'}/>
      <Grid container spacing={2}>
        {
            products?.products?.map(product =>
                <Grid item xs={4}>
                    <BoxCard
                    product={product} 
                    />
                </Grid>
            )
        }
      </Grid>
    </Box>
  )
}
