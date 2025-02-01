import React, { useEffect, useState, useMemo } from 'react'
import BoxCard from '../../utils/BoxCard'
import { Grid, Box, Container, Pagination, Slider, Paper, Typography } from '@mui/material';
import MetaData from '../../utils/MetaData';
import { useGetAllProductsQuery } from '../../api/services/productApi';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/Loader';
import { useParams, useLocation, useNavigate} from 'react-router-dom';
import { grey, green, red, blue } from "@mui/material/colors";
import ReviewRating from '../../utils/ReviewRating';
import { setSelectedCategory, setPriceFilter } from '../../api/actions';
import { Products } from '../product/Products';
import { Category } from '../category/Category';

export default function Home() {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('')
  const keyparam = new URLSearchParams(location.search)
  // const [price, setPrice] = useState([1, 150])
  // const [selectedCategory, setSelectedCategory] = useState('')
  const [rating, setRating] = useState(0)
  const {stateStore} = useSelector((state) => state)
  const [localproducts, setLocalProducts] = useState(null)

  const {categories, products, selectedCategory, priceFilter} = stateStore
  const handlePriceChange = (event, newValue) => {
    dispatch(setPriceFilter(newValue));
  };

  const valueText = (value) => {
    return `$${value}`;
  }

  const generateMarks = (min, max, step) => {
    const marks = [];
    for (let value = min; value <= max; value += step) {
      marks.push({
        value: value,
        label: `$${value}`,
      });
    }
    return marks;
  };
  
  // Example usage
  const min = 0;
  const max = 500;
  const step = 50;
  
  const marks = generateMarks(min, max, step);

  useEffect(() =>{
    setKeyword(keyparam.get('search'));
  }, [keyparam])
  
 
  // const filteredProductCount = data?.filteredProductCount
  // const productCount = data?.productCount
  // const resPerPage = data?.resPerPage
  // let count = productCount;
  // if (keyword) {
  //   count = filteredProductCount
  // }
  // const itemPerPage = Math.ceil(count / resPerPage)

  console.log('selectedCategory -->', selectedCategory)
  useEffect(() =>{
    // setLocalProducts(products)
    filteredProduct()
  }, [products, selectedCategory, keyword, priceFilter])

  console.log('localProd -->, ', localproducts)
  console.log('selectedCategory -->', selectedCategory)
  console.log('keyword -->', keyword)

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const filteredProduct = () => {
    if (!products || !products.length) {
      setLocalProducts(null);
      return;
    }
  
    let filteredProducts = [...products];
  
    if (keyword) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product.category.toLowerCase().includes(keyword.toLowerCase()) ||
        product.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === selectedCategory
      );
    }
  
    if (priceFilter[0] < priceFilter[1]) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= priceFilter[0] && product.price <= priceFilter[1]
      );
    }
  
    setLocalProducts(filteredProducts);
  };

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category))
    // keyparam.delete('search');
    
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
                min={0}
                max={150}
                value={priceFilter}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={value => `$${value}`}
              />
            </Box>
            </Box>
            {/* <Box>
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
            </Box> */}
          </Grid>
          <Grid item>
            
                <Category categories={categories} handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory}/>
          </Grid>
        </Grid>

        <Grid item direction="row" md={9} sm={12} xs={12} spacing={2}>
          <Products products={localproducts} />
         
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
