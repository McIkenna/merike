import React, { useState } from 'react';
import { Box, Typography, Collapse, Button, Paper } from '@mui/material';
import { blueGrey, green } from '@mui/material/colors';
import { keyframes } from '@emotion/react';
import { useGetAllBannerQuery } from '../../api/services/bannerApi';

// Define the animation keyframes
const moveLeft = keyframes`
  0% {
    transform: translateX(150%);
  }
  100% {
    transform: translateX(-120%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Banner = () => {
  const [open, setOpen] = useState(true);
  const { data: bannerData, error: bannerError, isLoading: bannerIsLoading, isSuccess: bannerIsSuccess} = useGetAllBannerQuery();

  const handleToggle = () => {
    setOpen(!open);
  };

  // Calculate animation duration based on text length
  const calculateAnimationDuration = (text) => {
    if (!text) return 10;
    
    const textLength = text.length;
    // Base duration: 10 seconds for ~50 characters
    // Add 0.1 second for each additional character
    // Minimum 5 seconds, maximum 30 seconds
    const duration = Math.max(10, Math.min(50, 20 + (textLength) * 0.1));
    
    return duration;
  };

  return (
    <Box>
      <Collapse in={open}>
        <Paper elevation={3} sx={{ 
            padding: '16px', 
            marginTop: '0', 
            backgroundColor: green['A200'],
          }}>
           {bannerData?.adverts?.map((advert, index) => {
             const fullText = `(${advert?.name}) - ${advert?.description}`;
             const animationDuration = calculateAnimationDuration(fullText);
             
             return (
               <Box 
                 key={index}
                 sx={{ 
                   display: 'flex', 
                   justifyContent: 'space-between', 
                   alignItems: 'center',  
                   overflow: 'hidden',
                   animation: `${open ? fadeIn : fadeOut} 5s`,
                   marginBottom: index < bannerData.adverts.length - 1 ? '8px' : '0'
                 }}
               >
                 <Typography 
                   variant="h7"
                   sx={{ 
                     whiteSpace: 'nowrap', 
                     display: 'inline-block', 
                     animation: `${moveLeft} ${animationDuration}s linear infinite` 
                   }}
                 >
                   {fullText}
                 </Typography>
               </Box>
             );
           })}
        </Paper>
      </Collapse>
    </Box>
  );
};

export default Banner;