import React, { useRef } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  IconButton,
  Container
} from '@mui/material';
import { ArrowBack, ArrowForward} from '@mui/icons-material';
// import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const ViewCarousel = ( {allProducts, viewedProducts}) => {
  const scrollContainerRef = useRef(null);


  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h6" component="h2" fontWeight="bold" mb={3} color="text.primary">
        Recently Viewed Products
      </Typography>
      
      <Box sx={{ position: 'relative', '&:hover .nav-button': { opacity: 1 } }}>
        {/* Left Arrow */}
        <IconButton
          className="nav-button"
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: 'background.paper',
            boxShadow: 2,
            opacity: 0,
            transition: 'opacity 0.3s',
            '&:hover': { bgcolor: 'action.hover' }
          }}
          aria-label="Scroll left"
        >
        <ArrowBack size={24} />
        </IconButton>

        {/* Carousel Container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {viewedProducts.map((product) => (
            <Card
              key={product?.id}
              sx={{
                flexShrink: 0,
                width: 260,
                transition: 'box-shadow 0.3s, transform 0.2s',
                '&:hover': { 
                  boxShadow: 6,
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="260"
                image={product?.images[0].url}
                alt={product?.name}
                sx={{
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.1)' }
                }}
              />
              <CardContent>
                <Typography 
                  variant="h7" 
                  component="h3" 
                  fontWeight="600"
                  noWrap
                  mb={1}
                >
                  {product?.name}
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h7" component="span" fontWeight="bold">
                    ${product?.price}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton
          className="nav-button"
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: 'background.paper',
            boxShadow: 2,
            opacity: 0,
            transition: 'opacity 0.3s',
            '&:hover': { bgcolor: 'action.hover' }
          }}
          aria-label="Scroll right"
        >
          <ArrowForward size={24} />
        </IconButton>
      </Box>
    </Container>
  );
};

export default ViewCarousel;