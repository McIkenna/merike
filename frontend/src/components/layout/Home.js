import React, {useEffect} from 'react'
import BoxCard from '../../utils/BoxCard'
import {Grid, Box, Container} from '@mui/material';
import MetaData from '../../utils/MetaData';
import { useGetAllProductQuery } from '../../api/services/productApi';
import { useDispatch } from 'react-redux';
import Loader from '../../utils/Loader';

export default function Home() {
    
    useDispatch()
    const { data: products, error: prodError, isLoading: prodIsLoading, isSuccess:prodIsSuccess } = useGetAllProductQuery();
   
    console.log('products-->', products)
  return (
    <Container maxWidth="lg">
        <MetaData title={'Buy Best Products Online'}/>
      <Grid container spacing={2}>
        {
           prodIsLoading ? <Loader/> :
           products && products?.products?.map(product =>
                <Grid item xs={4}>
                    <BoxCard
                    product={product} 
                    />
                </Grid>
            )
        }
      </Grid>
    </Container>
  )
}
