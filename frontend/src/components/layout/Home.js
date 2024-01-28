import React, {useEffect, useState} from 'react'
import BoxCard from '../../utils/BoxCard'
import {Grid, Box, Container, Pagination, Slider} from '@mui/material';
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
    const [price, setPrice] = useState([1, 1000])

    const handlePriceChange = (event,newValue) => {
      setPrice(newValue);
    };

    const valueText = (value) =>{
      return `$${value}`;
    }

    const marks = [
      {
        value: 1,
        label: '$1',
      },
      {
        value: 1000,
        label: '$1000',
      },
    ];

    const reqParams = {
      keyword: keyword,
      currentPage: currentPage,
      price: price
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
      
    {keyword ? 
      <Box>
        <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Always visible"
        defaultValue={[1,1000]}
        getAriaValueText={valueText}
        step={1}
        marks={marks}
        min={1}
        max={1000}
        value={price}
        onChange={handlePriceChange}
        valueLabelDisplay="on"
        valueLabelFormat={value => `$${value}`}
      />
      </Box>
      <Box pt={'50px'}>
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
      </Box>
    </Box>
    

    : 
    <Box>
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
    </Box>
    }
     
      <Box>
        <Pagination 
        count={itemPerPage} 
        page={currentPage} 
        onChange={handleChange} />
      </Box>
    </Container>
  )
}
