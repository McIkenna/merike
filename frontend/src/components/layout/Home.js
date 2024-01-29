import React, { useEffect, useState } from 'react'
import BoxCard from '../../utils/BoxCard'
import { Grid, Box, Container, Pagination, Slider, Paper, Typography } from '@mui/material';
import MetaData from '../../utils/MetaData';
import { useGetAllProductQuery } from '../../api/services/productApi';
import { useDispatch } from 'react-redux';
import Loader from '../../utils/Loader';
import { useParams } from 'react-router-dom';
import { useGetAllCategoryQuery } from '../../api/services/categoryApi';
import {grey, green, red, blue} from "@mui/material/colors";
export default function Home() {

  useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();
  const keyword = params.keyword;
  const [price, setPrice] = useState([1, 1000])
  const [category, setCategory] = useState('')
  const { data: categories, error: catError, isLoading: catIsLoading, isSuccess } = useGetAllCategoryQuery();
  console.log('categories -->', categories)
  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const valueText = (value) => {
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
    price: price,
    category: category
  }
  const { data, error: prodError, isLoading: prodIsLoading, isSuccess: prodIsSuccess, ...props } = useGetAllProductQuery(reqParams);
  
  const products = data?.products
  const filteredProductCount = data?.filteredProductCount
  const productCount = keyword ? filteredProductCount : data?.productCount
  const resPerPage = data?.resPerPage
  const itemPerPage = Math.ceil(productCount / resPerPage)
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // console.log('products-->', products)
  return (
    <Box>

      <MetaData title={'Buy Best Products Online'} />

      <Grid container spacing={2} justify="center">
        <Grid item container direction="column" md={3} sm={12} xs={12} spacing={2}>
          <Grid item>
          <Typography variant='h6'>Price Filter</Typography>
            <Box>
              <Slider
                aria-label="Always visible"
                defaultValue={[1, 1000]}
                getAriaValueText={valueText}
                step={1}
                marks={marks}
                min={1}
                max={1000}
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={value => `$${value}`}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Typography variant='h6'>Categories</Typography>
              <Box>
                {
                  catIsLoading ? <Loader /> :
                    categories && categories?.categories?.map((category, index) =>
                      <Paper elevation={0}
                      sx={{ cursor: 'pointer', listStyleType: 'none', margin: '10px', padding: '10px', backgroundColor: grey[100]}} key={index}
                        onClick={() => setCategory(category?.categoryName)}>
                        {category?.categoryName}
                      </Paper>
                    )
                }
              </Box>
            </Box>

          </Grid>
        </Grid>

        <Grid item direction="row" md={9} sm={12} xs={12} spacing={2}>
          <Grid item container>
          {
            prodIsLoading ? <Loader /> :
              products && products?.map(product =>
                <Grid item md={4} sm={6} xs={12}>
                  <BoxCard
                    product={product}
                  />
                </Grid>
              )
          }
          </Grid>
          <Box>
            { resPerPage <= productCount && <Pagination
              count={itemPerPage}
              page={currentPage}
              onChange={handleChange} />}
          </Box>
        </Grid>
      </Grid>


    </Box>
  )
}
