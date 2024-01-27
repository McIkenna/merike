import React, {useEffect, useState} from 'react'
import BoxCard from '../../utils/BoxCard'
import {Grid, Box, Container, Pagination} from '@mui/material';
import MetaData from '../../utils/MetaData';
import { useGetAllProductQuery } from '../../api/services/productApi';
import { useDispatch } from 'react-redux';
import Loader from '../../utils/Loader';
import { useParams } from 'react-router-dom';

export default function Home() {
    
    useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams();
    const keyword = params.keyword;

    const reqParams = {
      keyword: keyword,
      currentPage: currentPage
    }
    const { data, error: prodError, isLoading: prodIsLoading, isSuccess:prodIsSuccess, ...props} = useGetAllProductQuery(reqParams);
    // console.log('data -->', data)
    const products = data?.products
    const productCount = data?.productCount
    const count = data?.count
    const resPerPage = data?.resPerPage
    const itemPerPage = Math.ceil(productCount/resPerPage)
    // console.log('itemPerPage', itemPerPage)
    // console.log('products', products)
    // console.log('count', count)
    // console.log('resPerPage', resPerPage)
    const handleChange = (event, value) => {
      setCurrentPage(value);
    };
  
    // console.log('products-->', products)
  return (
    <Container maxWidth="lg">
        <MetaData title={'Buy Best Products Online'}/>
      <Grid container spacing={2}>
        {
           prodIsLoading ? <Loader/> :
           products && products?.map(product =>
                <Grid item xs={4}>
                    <BoxCard
                    product={product} 
                    />
                </Grid>
            )
        }
      </Grid>
      <Box>
        <Pagination 
        count={itemPerPage} 
        page={currentPage} 
        onChange={handleChange} />
      </Box>
    </Container>
  )
}
