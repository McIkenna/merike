import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { ArrowBack, ArrowForward, Pause, PlayArrow } from '@mui/icons-material';

const CarouselItem = ({ item }) => (
    <Paper
        sx={{
            position: 'relative',
            height: { xs: '250px', sm: '350px', md: '400px' },
            background: `url(${item?.image?.url}) no-repeat center center`,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            overflow: 'hidden'
        }}
    >
        <Box
            sx={{
                position: 'absolute',
                bottom: { xs: '10px', sm: '15px', md: '20px' },
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: { xs: '6px 10px', sm: '8px 12px', md: '10px' },
                borderRadius: '4px',
                maxWidth: '90%'
            }}
        >
            <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' } }}>
                {item?.description}
            </Typography>
        </Box>
    </Paper>
);

const CarouselBanner = ({carouselItems}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const numItems = carouselItems.length;
    const autoPlayRef = useRef(null);

    useEffect(() => {
        if (!isPaused) {
            autoPlayRef.current = setInterval(() => {
                setActiveStep(prev => (prev + 1) % numItems);
            }, 3000);
        } else {
            clearInterval(autoPlayRef.current);
        }
        return () => clearInterval(autoPlayRef.current);
    }, [isPaused, numItems]);

    const handleNext = () => {
        setActiveStep(prev => (prev + 1) % numItems);
    };

    const handlePrevious = () => {
        setActiveStep(prev => (prev - 1 + numItems) % numItems);
    };

    const handlePause = () => {
        setIsPaused(prev => !prev);
    };

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            {/* Carousel */}
            <Box sx={{ maxWidth: '100vw', margin: 'auto', marginTop: '0' }}>
                <Carousel
                    index={activeStep}
                    autoPlay={false}
                    navButtonsAlwaysInvisible
                >
                    {carouselItems.map((item, index) => (
                        <CarouselItem key={index} item={item} />
                    ))}
                </Carousel>
            </Box>

            {/* Control Buttons - Always on top */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: { xs: '10px', sm: '20px', md: '40px' },
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: '8px', sm: '10px' },
                    zIndex: 1000,
                    pointerEvents: 'auto'
                }}
            >
                <IconButton 
                    onClick={handlePrevious} 
                    sx={{
                        backgroundColor: 'primary.dark', 
                        color: 'neutral.white',
                        width: { xs: '36px', sm: '42px', md: '48px' },
                        height: { xs: '36px', sm: '42px', md: '48px' },
                        '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'neutral.gray'
                        },
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                >
                    <ArrowBack sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' } }} />
                </IconButton>
                <IconButton 
                    onClick={handlePause} 
                    sx={{
                        backgroundColor: 'success.main', 
                        color: 'neutral.dark',
                        width: { xs: '36px', sm: '42px', md: '48px' },
                        height: { xs: '36px', sm: '42px', md: '48px' },
                        '&:hover': {
                            backgroundColor: 'success.light',
                            color: 'neutral.gray'
                        },
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    {isPaused ? <PlayArrow sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' } }} /> : <Pause sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' } }} />}
                </IconButton>
                <IconButton 
                    onClick={handleNext} 
                    sx={{
                        backgroundColor: 'secondary.dark', 
                        color: 'neutral.white',
                        width: { xs: '36px', sm: '42px', md: '48px' },
                        height: { xs: '36px', sm: '42px', md: '48px' },
                        '&:hover': {
                            backgroundColor: 'secondary.light',
                            color: 'neutral.gray'
                        },
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                >
                    <ArrowForward sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' } }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CarouselBanner;