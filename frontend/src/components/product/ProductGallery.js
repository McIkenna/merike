import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import { RemoveOutlined, AddOutlined, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { grey, green, red } from "@mui/material/colors";
import ReviewRating from '../../utils/ReviewRating';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IconButton } from '@mui/material';

export const ProductGallery = ({ product }) => {

    const productImages = product?.images;
    const [mainImageIndex, setMainImageIndex] = useState(0);


    const nextImage = () => {
        setMainImageIndex((prevIndex) => (prevIndex + 1) % product?.images?.length);
    };

    const prevImage = () => {
        setMainImageIndex((prevIndex) => (prevIndex - 1 + product?.images?.length) % product?.images?.length);
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
            <Grid container spacing={2}>
                <Grid item xs={3} md={3} sm={3}>
                    {/* Thumbnail Carousel */}
                    <Slider
                        {...thumbnailSettings}
                    // asNavFor=".main-slider"
                    // ref={(slider) => (this.thumbnailSlider = slider)}
                    >
                        {productImages.map((image, index) => (
                            <Box
                            sx={{
                                border: '1px solid gray',
                                borderRadius: '10px'
                            }}>

                           


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
                             </Box>

                        ))}
                    </Slider>
                </Grid>
                <Grid item xs={9} md={9} sm={9}>
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
                            right: `calc(20% - 80px)`,
                            transform: 'translateY(-50%)',
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            zIndex: 1
                        }}>
                            <ArrowForwardIos />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
