import React, { useEffect, useState, useMemo } from 'react'
import { Grid, Box, Slider, Typography, Popover, Icon, IconButton } from '@mui/material';
import MetaData from '../../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setPriceFilter, setRecommendedProducts, setProductRecentlyBought } from '../../api/actions';
import { Products } from '../product/Products.jsx';
import RecommendedProduct from '../product/RecommendedProduct.jsx';
import CartInspired from '../product/CartInspired.jsx';
import RecentBought from '../product/RecentBought.jsx';
import ViewCarousel from '../product/ViewCarousel.jsx';
import { Sort, SwapVert, FavoriteBorderRounded } from '@mui/icons-material';
import SortProd from '../../utils/SortProd.jsx';
import CarouselBanner from '../../utils/CarouselBanner.jsx';
export default function Home() {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const keyparam = new URLSearchParams(location.search)
  const { stateStore } = useSelector((state) => state)
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSort, setSelectedSort] = useState('Bestselling');
  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const { products, selectedCategory, priceFilter, viewedProducts, cartInspiredProducts, allOrders, 
    carouselItems 
  } = stateStore

  // console.log('allOrders in home -->', allOrders)
  const handlePriceChange = (event, newValue) => {
    dispatch(setPriceFilter(newValue));
  };

  const getRecentlyBoughtProducts = useMemo(() => {
    if (!allOrders || allOrders.length === 0) return [];

    // Sort orders by paidAt (newest first). Fallback to createdAt or epoch 0.
    const ordersSorted = [...allOrders].sort((a, b) => {
      const ta = new Date(a?.paidAt ?? a?.createdAt ?? 0).getTime();
      const tb = new Date(b?.paidAt ?? b?.createdAt ?? 0).getTime();
      return tb - ta;
    });
    const recent = ordersSorted
      .flatMap(order => order?.orderItem ?? [])
      .map(item => {
      const pid = item?.product
        ? (typeof item.product === 'object' ? (item.product._id ?? item.product.id) : item.product)
        : (item?.productId ?? item?._id ?? item?.id);

      const found = products?.find(p => p._id === pid || p.id === pid);

      const image = found?.images?.[0]?.url ?? null;
      const orderId = item?._id;

      return { ...item, orderId: orderId, image, _id:pid };
      })
      .reduce((acc, item) => {
      if (!acc.seen.has(item._id)) {
        acc.seen.add(item._id);
        acc.result.push(item);
      }
      return acc;
      }, { seen: new Set(), result: [] })
      .result;

      dispatch(setProductRecentlyBought(recent));
      localStorage.setItem('productRecentlyBought', JSON.stringify(recent));

    return recent;

  }, [allOrders, products, dispatch]);


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

  useEffect(() => {
    setKeyword(keyparam.get('search'));
  }, [keyparam])



  const recommendations = useMemo(() => {
    if (viewedProducts?.length === 0 || !products || !products?.length) return [];
    const lastViewed = viewedProducts[0];
    const similarProducts = products?.filter(
      (p) => p?.category === lastViewed?.category && p?._id !== lastViewed?._id
    );
    dispatch(setRecommendedProducts(similarProducts));
    localStorage.setItem('recommendedProducts', JSON.stringify(similarProducts));
    const sameCategory = similarProducts?.slice(0, 8);
    return sameCategory;
   
  }, [viewedProducts, products, dispatch]);


  const filteredProduct = useMemo(() => {
    if (!products || !products?.length) {
      return null;
    }

    let filteredProducts = [...products];

    if (keyword) {
      filteredProducts = filteredProducts?.filter(product =>
        product?.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product?.category.toLowerCase().includes(keyword.toLowerCase()) ||
        product?.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts?.filter(product =>
        selectedCategory !== 'all' ? product?.category === selectedCategory : product
      );
    }

    if (priceFilter[0] < priceFilter[1]) {
      filteredProducts = filteredProducts?.filter(product =>
        product.price >= priceFilter[0] && product.price <= priceFilter[1]
      );
    }
      switch (selectedSort) {
        case 'price-low-high':
          return [...filteredProducts].sort((a, b) => a?.price - b?.price);
        case 'price-high-low':
          return [...filteredProducts].sort((a, b) => b?.price - a?.price);
        case 'newest':
          return [...filteredProducts].sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
        case 'discount':
          return [...filteredProducts].sort((a, b) => (b?.discount || 0) - (a?.discount || 0));
        default:
          return filteredProducts; // bestselling
      }
    
  }, [products, keyword, selectedCategory, priceFilter, selectedSort]);


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const handleSelect = (selectType) => {
      switch (selectType) {
        case 'recommended':
          navigate('/recommended');
          break;
        case 'cart-inspired':
          navigate('/cart-inspired');
          break;
        case 'recently-bought':
          navigate('/recently-bought');
          break;
        default:
          break;
      }
    }


  return (
    <Box
    >
      <MetaData title={'Buy Best Products Online'} />
      <CarouselBanner carouselItems={carouselItems}/>
      <Box sx={{ display: 'flex'}}>
        <Box sx={{justifyContent: 'flex-start', alignItems: 'center', mb: 2 }}>
          <IconButton aria-describedby={id} onClick={ () => navigate('/favoritePage')} >
            <FavoriteBorderRounded sx={{ fontSize: '1.5em' }} />
          </IconButton>
          <Typography variant='caption'>Favorites</Typography>
        </Box>
        <Box>
       
        <Box sx={{ justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
          <IconButton aria-describedby={id} onClick={handlePopover} >
            <SwapVert sx={{ fontSize: '1.5em' }} />
          </IconButton>
          <Typography variant='caption'>Sort Products</Typography>
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <SortProd
            onSortChange={(sortOption) => {
              console.log('Selected sort option:', sortOption);
              // Implement sorting logic here based on sortOption
              // handleClosePopover();
            }}
            valueText={valueText}
            handlePriceChange={handlePriceChange}
            marks={marks}
            priceFilter={priceFilter}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </Popover>
        </Box>
      </Box>
      
      <Grid container spacing={2} justify="center" paddingBottom={'20px'}>
        <Grid item direction="row" md={12} sm={12} xs={12} spacing={2}>
          <Products products={filteredProduct} />
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center" padding='80px 0' >
        <Grid item md={4} sm={4} xs={4}>
          {recommendations?.length > 0 && <RecommendedProduct recommendedProducts={recommendations} handleSelect={handleSelect}/>}
             
        </Grid>
        <Grid item md={4} sm={4} xs={4}>
          {cartInspiredProducts.length > 0 && <CartInspired cartInspiredProducts={cartInspiredProducts.slice(0, 4)} handleSelect={handleSelect} />}
        </Grid>
        <Grid item md={4} sm={4} xs={4}>
          {getRecentlyBoughtProducts?.length > 0 && <RecentBought recentBoughtProducts={getRecentlyBoughtProducts.slice(0, 4)} handleSelect={handleSelect}/>}
        </Grid>
        {/* <LastViewed allProducts={localproducts} viewedProducts={viewedProducts} /> */}

      </Grid>
      <ViewCarousel allProducts={filteredProduct} viewedProducts={viewedProducts} />
    </Box>
  )
}
