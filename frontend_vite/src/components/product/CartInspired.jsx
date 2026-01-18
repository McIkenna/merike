import React from 'react';
import { Card, Box, Typography, ImageList, ImageListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  height: 500,
  cursor: 'pointer',
  border: '1px solid',
  borderColor: theme.palette.divider,
  overflow: 'hidden',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.03) 50%, rgba(236, 72, 153, 0.05) 100%)',
    opacity: 0,
    transition: 'opacity 0.5s ease',
  },
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '&::before': {
      opacity: 1,
    },
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  marginBottom: theme.spacing(3),
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  background: 'linear-gradient(90deg, #0f172a 0%, #475569 50%, #0f172a 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
}));

const AccentLine = styled(Box)(( ) => ({
  height: 4,
  width: 80,
  background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)',
  borderRadius: 999,
}));

const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '& img': {
      transform: 'scale(1.1)',
    },
    '&::after': {
      opacity: 1,
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '& img': {
    transition: 'transform 0.5s ease',
  },
}));
const CartInspired = ({ cartInspiredProducts, handleSelect }) => {

    
      const itemData = [
    { cols: 2, rows: 2 }, // Item 0 - large
    { cols: 1, rows: 1 }, // Item 1
    { cols: 1, rows: 1 }, // Item 2
    { cols: 1, rows: 1 }, // Item 3
    { cols: 1, rows: 1 }, // Item 4
    { cols: 1, rows: 1 }, // Item 5
    { cols: 1, rows: 1 }, // Item 6
    { cols: 2, rows: 2 }, // Item 7 - large
  ];


  return (
    <StyledCard onClick={() => handleSelect?.('cart-inspired')}>
      <HeaderBox>
        <GradientText>
          Products in your Cart
        </GradientText>
        <AccentLine />
      </HeaderBox>

      <Box sx={{ position: 'relative', zIndex: 1, height: 'calc(100% - 80px)' }}>
        <ImageList
          variant="quilted"
          cols={4}
          gap={12}
          sx={{ 
            width: '100%', 
            height: '100%',
            margin: 0,
          }}
        >
          {cartInspiredProducts?.slice(0, 8)?.map((item, index) => (
            <StyledImageListItem
              key={index}
              cols={itemData[index]?.cols || 1}
              rows={itemData[index]?.rows || 1}
            >
              <img
                srcSet={`${item?.image}?w=400&h=400&fit=crop&auto=format&dpr=2 2x`}
                src={`${item?.image}?w=400&h=400&fit=crop&auto=format`}
                alt={item?.name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </StyledImageListItem>
          ))}
        </ImageList>
      </Box>

    </StyledCard>
  );

};

export default CartInspired;


