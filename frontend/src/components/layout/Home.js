import React, { useEffect, useState, useMemo } from 'react'
import BoxCard from '../../utils/BoxCard'
import { Grid, Box, Container, Pagination, Slider, Paper, Typography } from '@mui/material';
import MetaData from '../../utils/MetaData';
import { useGetAllProductsQuery } from '../../api/services/productApi';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/Loader';
import { useParams } from 'react-router-dom';
import { grey, green, red, blue } from "@mui/material/colors";
import ReviewRating from '../../utils/ReviewRating';
import { setProducts, filterProductByCategory } from '../../api/actions';
import { Products } from '../product/Products';
import { Category } from '../category/Category';
export default function Home() {

  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();
  const keyword = params.keyword;
  const [price, setPrice] = useState([1, 150])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [rating, setRating] = useState(0)
  const {stateStore} = useSelector((state) => state)
 
  const {categories, products} = stateStore
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

  
 
  // const filteredProductCount = data?.filteredProductCount
  // const productCount = data?.productCount
  // const resPerPage = data?.resPerPage
  // let count = productCount;
  // if (keyword) {
  //   count = filteredProductCount
  // }
  // const itemPerPage = Math.ceil(count / resPerPage)
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const filteredProduct = useMemo(() => {
    let filteredProducts = [];
    if(!products || !products?.length){
      return []
    }
    else{
      filteredProducts = [...products]   
      if (keyword) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product =>
          product.category === selectedCategory
        );
      }
      if (price[0] < price[1]) {
        filteredProducts = filteredProducts.filter(product =>
          product.price >= price[0] && product.price <= price[1]
        );
      }
    }
   
    return filteredProducts;

  }, [products, selectedCategory, keyword, price])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    // dispatch(filterProductByCategory(category))
  }
  return (
    <Box>

      <MetaData title={'Buy Best Products Online'} />

      <Grid container spacing={2} justify="center">
        <Grid item container direction="column" md={3} sm={12} xs={12} spacing={2}>
          <Grid item>
            <Box>
            <Typography variant='h6'>Price Filter</Typography>
            <Box>
              <Slider
                aria-label="Always visible"
                defaultValue={[1, 150]}
                getAriaValueText={valueText}
                step={1}
                marks={marks}
                min={1}
                max={150}
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={value => `$${value}`}
              />
            </Box>
            </Box>
            <Box>
              <Typography variant='h6'>Ratings</Typography>
              <Box>
                {
                    [5,4,3,2,1].map((star, index) =>
                    (
                      <div 
                      onClick={() => {setRating(star)}}
                      style={{ cursor: 'pointer'}}>
                          <ReviewRating value={star} />
                      </div>
                    )
                    )
                }
              </Box>
            </Box>
          </Grid>
          <Grid item>
            
                <Category categories={categories} handleCategoryChange={handleCategoryChange}/>
          </Grid>
        </Grid>

        <Grid item direction="row" md={9} sm={12} xs={12} spacing={2}>
          <Products products={filteredProduct} />
         
          {/* <Box>
            {resPerPage <= productCount && <Pagination
              count={itemPerPage}
              page={currentPage}
              onChange={handleChange} />}
          </Box> */}
        </Grid>
      </Grid>


    </Box>
  )
}
