import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { ArrowBack, ArrowForward, Pause, PlayArrow } from '@mui/icons-material';
import { green, blue, red } from '@mui/material/colors';

const items = [
    {
        image: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        description: 'This is the description for Image 1'
    },
    {
        image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        description: 'This is the description for Image 2'
    },
    {
        image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        description: 'This is the description for Image 3'
    },
    {
        image: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
        description: 'This is the description for Image 4'
    }
];

const CarouselItem = ({ item }) => (
    <Paper
        sx={{
            position: 'relative',
            height: '400px',
            background: `url(${item.image}) no-repeat center center`,
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
                bottom: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '4px'
            }}
        >
            <Typography variant="h6">{item.description}</Typography>
        </Box>
    </Paper>
);

const CarouselBanner = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const numItems = items.length;
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
        <Box >
            <Box sx={{ maxWidth: '100vw', margin: 'auto', marginTop: '0' }}>
                <Carousel
                    index={activeStep}
                    autoPlay={false}
                    navButtonsAlwaysInvisible
                >
                    {items.map((item, index) => (
                        <CarouselItem key={index} item={item} />
                    ))}
                </Carousel>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '40px',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    zIndex: 4,
                    padding: '20px'
                }}
            >
                <IconButton onClick={handlePrevious} sx={{backgroundColor: blue['A400'], color: 'white'}}>
                    <ArrowBack />
                </IconButton>
                <IconButton onClick={handlePause} sx={{backgroundColor: green['A400'], color: 'white'}}>
                    {isPaused ? <PlayArrow /> : <Pause />}
                </IconButton>
                <IconButton onClick={handleNext} sx={{backgroundColor: red['A400'], color: 'white'}}>
                    <ArrowForward />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CarouselBanner;