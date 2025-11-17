import React, { useEffect, useState, useMemo } from 'react'
import BoxCard from '../../utils/BoxCard'
import { Grid, Box, Slider, Typography, Popover, Icon, IconButton } from '@mui/material';
import MetaData from '../../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { setSelectedCategory, setPriceFilter } from '../../api/actions';
import { Products } from '../product/Products';
import RecommendedProduct from '../product/RecommendedProduct';
import CartInspired from '../product/CartInspired';
import RecentBought from '../product/RecentBought';
import ViewCarousel from '../product/ViewCarousel';
import { Sort, SwapVert } from '@mui/icons-material';
import SortProd from '../../utils/SortProd';
export default function Home() {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
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

  const { categories, products, selectedCategory, priceFilter, viewedProducts, cartInspiredProducts, allOrders } = stateStore

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
        // resolve product id whether item.product is an id or an object
        const pid = item?.product
          ? (typeof item.product === 'object' ? (item.product._id ?? item.product.id) : item.product)
          : (item?.productId ?? item?._id ?? item?.id);

        const found = products?.find(p => p._id === pid || p.id === pid);

        // prefer product.images[0].url, fallback to other possible shapes
        const image = found?.images[0]?.url ?? null;

        return { ...item, image };
      })
      .slice(0, 4);
    return recent;

  }, [allOrders, products]);


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



  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const recommendations = useMemo(() => {
    if (viewedProducts?.length === 0 || !products || !products?.length) return [];
    const lastViewed = viewedProducts[0];
    const similarProducts = products?.filter(
      (p) => p?.category === lastViewed?.category && p?._id !== lastViewed?._id
    );
    const sameCategory = similarProducts?.slice(0, 8);
    return sameCategory;
    // dispatch(setRecommendedProducts(sameCategory));
    // localStorage.setItem("recommendedProducts", JSON.stringify(sameCategory));
  }, [viewedProducts, products]);


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




  return (
    <Box>

      <MetaData title={'Buy Best Products Online'} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <Box>
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
      {/* <CarouselBanner /> */}
      <Grid container spacing={2} justify="center">
        <Grid item direction="row" md={12} sm={12} xs={12} spacing={2}>
          <Products products={filteredProduct} />
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center" paddingTop='40px'>
        <Grid item md={4} sm={4} xs={4}>
          <RecommendedProduct recommendedProducts={recommendations} />
        </Grid>
        <Grid item md={4} sm={4} xs={4}>
          <CartInspired cartInspiredProducts={cartInspiredProducts} />
        </Grid>
        <Grid item md={4} sm={4} xs={4}>
          <RecentBought recentBoughtProducts={getRecentlyBoughtProducts} />
        </Grid>
        {/* <LastViewed allProducts={localproducts} viewedProducts={viewedProducts} /> */}

      </Grid>
      <ViewCarousel allProducts={filteredProduct} viewedProducts={viewedProducts} />
    </Box>
  )
}
