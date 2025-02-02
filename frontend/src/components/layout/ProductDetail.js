import React, { useState, useEffect } from 'react'
import {
  Container, Grid, Paper, Typography, Button, Box, IconButton, List,
  ListItem,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '../../api/services/productApi';
import Loader from '../../utils/Loader';
import { RemoveOutlined, AddOutlined, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { grey, green, red } from "@mui/material/colors";
import ReviewRating from '../../utils/ReviewRating';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MetaData from '../../utils/MetaData';

export default function ProductDetail() {
  const params = useParams();
  const { data, error, isLoading, isSuccess } = useGetSingleProductQuery(params.id);
  const product = data?.product;

  const productImages = product?.images;
  const [mainImageIndex, setMainImageIndex] = useState(0);


  const nextImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };
  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: productImages?.length,
    slidesToScroll: 1,
    focusOnSelect: true,
    vertical: true,
    beforeChange: (current, next) => setMainImageIndex(next),
    verticalSwiping: true,
    arrows: false,
  };

  return (
    <Box>
      <MetaData title={product?.name} />
      {
        data && data.product ?
          <Paper elevation={0} style={{ padding: '10px', marginTop: '20px' }}>
            <Grid container spacing={2}>
              {/* Additional Product Images */}
              <Grid item xs={4} md={2} sm={4}>
                {/* Thumbnail Carousel */}
                <Slider
                  {...thumbnailSettings}
                // asNavFor=".main-slider"
                // ref={(slider) => (this.thumbnailSlider = slider)}
                >
                  {productImages.map((image, index) => (


                    <img
                      key={index}
                      src={image?.url}
                      alt={`Product ${index + 1}`}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        border: index === mainImageIndex ? '2px solid #1976D2' : 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => setMainImageIndex(index)}
                    />

                  ))}
                </Slider>
              </Grid>

              <Grid item xs={8} md={5} sm={8}>
                {/* Main Image Carousel */}
                <Box display="flex" alignItems="center" justifyContent="center">
                  <IconButton onClick={prevImage} sx={{
                    // position: 'absolute',
                    top: '50%',
                    left: `calc(20% - 80px)`,
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    zIndex: 1
                  }}>
                    <ArrowBackIos />
                  </IconButton>
                  <Box
                    style={{
                      position: "relative",
                      width: "100%",
                      overflow: "hidden",
                    }}>
                    <img
                      // key={index}
                      src={productImages[mainImageIndex]?.url}
                      alt={`Product ${mainImageIndex + 1}`}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />

                  </Box>

                  <IconButton onClick={nextImage} sx={{
                    // position: 'absolute',
                    top: '50%',
                    right: `calc(20% - 60px)`,
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    zIndex: 1
                  }}>
                    <ArrowForwardIos />
                  </IconButton>
                </Box>
              </Grid>


              <Grid item xs={12} md={5} sm={12}>
                {/* Product Details */}
                <Box padding={'20px 10px 20px 10px'}>
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Category: {product.category}
                  </Typography>
                  <hr />
                  <ReviewRating value={product.ratings} />
                  <hr />

                  <Typography variant="h6" gutterBottom color={green[800]} paddingTop='20px'>
                    Price: ${product.price}
                  </Typography>
                  <Box
                    sx={{
                      mb: 4,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: '20px'
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        pt: 1,
                        pb: 1,
                        pr: 3,
                        pl: 3,
                        bgcolor: grey[100],
                        borderRadius: 2
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", fontSize: "17px" }}
                      >
                        1
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex' }}>
                      <IconButton variant="body1" size='large' sx={{ background: red[500], color: 'white', marginRight: '10px' }}>
                        <RemoveOutlined size={2} />
                      </IconButton>
                      <IconButton variant="body1" size='large' sx={{ background: green[500], color: 'white' }}>
                        <AddOutlined size={2} />
                      </IconButton>

                    </Box>
                    <Button variant="contained" color="primary">
                      Add to Cart
                    </Button>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color={product.stock > 0 ? green[800] : red[500]} >
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                  </Box>
                  <hr />
                  <Typography variant="body1" paragraph paddingTop={'20px'}>
                    {product.description}
                  </Typography>
                </Box>


              </Grid>
            </Grid>
          </Paper> :
          <Loader />}
   </Box>
  )
}
