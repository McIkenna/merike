import  { useState, useEffect } from 'react';
import { Box, Typography, Collapse, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useSelector } from 'react-redux';

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

// const fadeOut = keyframes`
//   from {
//     opacity: 1;
//   }
//   to {
//     opacity: 0;
//   }
// `;


const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use mock data - replace with your Redux selector
  const { stateStore } = useSelector((state) => state)
  const { bannerItems } = stateStore;

  // Calculate animation duration based on text length
  const calculateAnimationDuration = (text) => {
    if (!text) return 10;
    
    const textLength = text.length;
    const duration = Math.max(5, Math.min(50, 10 + (textLength) * 0.1));
    
    return duration;
  };

  useEffect(() => {
    if (!bannerItems || bannerItems.length === 0) return;

    const currentItem = bannerItems[currentIndex];
    const fullText = `(${currentItem?.name}) - ${currentItem?.description}`;
    const animationDuration = calculateAnimationDuration(fullText);
    
    // Move to next item after animation completes
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
    }, animationDuration * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, bannerItems]);

  if (!bannerItems || bannerItems.length === 0) {
    return null;
  }

  const currentItem = bannerItems[currentIndex];
  const fullText = `(${currentItem?.name}) - ${currentItem?.description}`;
  const animationDuration = calculateAnimationDuration(fullText);

  return (
    <Box>
      <Collapse in={true}>
        <Paper 
          elevation={3} 
          sx={{ 
            padding: '16px', 
            marginTop: '0', 
            backgroundColor: 'success.light',
            display: 'flex',
            position: 'relative',
            borderRadius: '0px'

          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',  
              overflow: 'hidden',
              width: '100%',
              animation: `${fadeIn} 0.5s ease-in-out`
            }}
          >
            <Typography 
              variant="h6"
              sx={{ 
                whiteSpace: 'nowrap', 
                display: 'flex', 
                animation: `${moveLeft} ${animationDuration}s linear infinite`,
                fontWeight: 500
              }}
            >
              {fullText}
            </Typography>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default Banner;