import React, { useState } from 'react';
import { Box, Typography, Collapse, Button, Paper } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { blueGrey, green } from '@mui/material/colors';
import { keyframes } from '@emotion/react';

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
    opacity: 5;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 5;
  }
  to {
    opacity: 0;
  }
`;

const Banner = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Collapse in={open}>
        <Paper elevation={3} sx={{ 
            padding: '16px', 
            marginTop: '0', 
            backgroundColor: green['A200'],
           
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  overflow: 'hidden',
            animation: `${open ? fadeIn : fadeOut} 1s` }}>
            <Typography 
            variant="h6"
            sx={{ 
              whiteSpace: 'nowrap', 
              display: 'inline-block', 
              animation: `${moveLeft} 10s linear infinite` 
            }}>
            Put Information here bab abduddj odifjjd difjfjf ihdfifjd iifji dfi dj f ihd idijdf hudfhfuhf d dfuhfduhudfh
          </Typography>
          {/* <Button onClick={handleToggle} startIcon={open ? <ExpandLess /> : <ExpandMore />}>
        {open ? 'Hide' : 'Show'} Banner
      </Button> */}
            </Box>
          
        </Paper>
       
      </Collapse>
    </Box>
  );
};

export default Banner;