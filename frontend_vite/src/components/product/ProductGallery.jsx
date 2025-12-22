import React, { useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import {
    ArrowBackIosNew,
    ArrowForwardIos,
} from '@mui/icons-material';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ProductGallery = ({ product }) => {
    const images = product?.images || [];
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(null);

    if (!images.length) return null;

    const thumbnailSettings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: Math.min(images?.length, 4),
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        focusOnSelect: true,
        arrows: false,
        beforeChange: (_, next) => setActiveIndex(next),
    };

    const handleNext = () =>
        setActiveIndex((i) => (i + 1) % images.length);

    const handlePrev = () =>
        setActiveIndex((i) => (i - 1 + images.length) % images.length);

    const currentIndex = hoverIndex !== null ? hoverIndex : activeIndex;


    return (
        <Box
        >
            <Grid container spacing={2}>
                {/* Thumbnails */}
                <Grid size={{xs:3}}>
                    <Box
                        sx={{
                            maxHeight: '100vh',
                            overflow: 'hidden',
                        }}
                    >
                        <Slider {...thumbnailSettings}>
                            {images.map((img, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        p: 0.5
                                    }}
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onMouseLeave={() => setHoverIndex(null)}

                                >
                                    <Box
                                        key={index}
                                        component="img"
                                        src={img.url}
                                        alt={`Thumbnail ${index + 1}`}
                                        sx={{
                                            width: '100%',
                                            objectFit: 'cover',
                                            borderRadius: 2,
                                            cursor: 'pointer',
                                            border:
                                                index === activeIndex
                                                    ? '2px solid #1976d2'
                                                    : '1px solid #e0e0e0',
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.03)',
                                            },
                                        }}
                                    />
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                </Grid>

                {/* Main Image */}
                <Grid size={{xs:9}}>
                    <Box
                        sx={{
                            position: 'relative',
                            borderRadius: 3,
                            overflow: 'hidden',
                            bgcolor: '#f5f5f5',
                        }}
                    >
                        <Box
                            component="img"
                            src={images[currentIndex]?.url}
                            alt={`Product image ${currentIndex + 1}`}
                            sx={{
                                width: '100%',
                                height: { xs: 260, md: 420 },
                                objectFit: 'contain',
                            }}
                        />

                        {/* Navigation Buttons */}
                        <IconButton
                            onClick={handlePrev}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: 12,
                                transform: 'translateY(-50%)',
                                bgcolor: 'rgba(0,0,0,0.55)',
                                color: '#fff',
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                            }}
                        >
                            <ArrowBackIosNew fontSize="small" />
                        </IconButton>

                        <IconButton
                            onClick={handleNext}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: 12,
                                transform: 'translateY(-50%)',
                                bgcolor: 'rgba(0,0,0,0.55)',
                                color: '#fff',
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                            }}
                        >
                            <ArrowForwardIos fontSize="small" />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
