import React, { useRef, useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  IconButton,
  Container,
  Chip,
  Rating,
  Button
} from '@mui/material';
import { 
  ArrowBack, 
  ArrowForward, 
  Visibility,
  FavoriteBorder,
  ShoppingCartOutlined
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  flexShrink: 0,
  width: 280,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    '& .product-image': {
      transform: 'scale(1.1)',
    },
    '& .quick-actions': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 280,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ProductImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  padding: '16px',
  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
});





const NavButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  width: 48,
  height: 48,
  border: '2px solid',
  borderColor: theme.palette.divider,
  opacity: 0,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: 'translateY(-50%) scale(1.1)',
  },
  '&.visible': {
    opacity: 1,
  },
  '&:disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
}));

const PriceBox = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1.5),
  backgroundColor: theme.palette.success.light,
  borderRadius: theme.spacing(3),
  marginTop: theme.spacing(1),
}));

const ViewCarousel = ({ allProducts, viewedProducts }) => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [viewedProducts]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleQuickView = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  const handleAddToFavorites = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to favorites logic
    console.log('Add to favorites:', product);
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic
    console.log('Add to cart:', product);
  };

  if (!viewedProducts || viewedProducts.length === 0) {
    return null;
  }

  return (
    <Box sx={{
      // margin: '40px 20px',
      padding: '40px 20px'
    }}>
      <Box>
        
        <Box 
          sx={{ 
            position: 'relative',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left Navigation Button */}
          <NavButton
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={isHovering && canScrollLeft ? 'visible' : ''}
            sx={{ left: -24 }}
            aria-label="Scroll left"
          >
            <ArrowBack />
          </NavButton>

          {/* Scrollable Products Container */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              pb: 2,
              px: 0.5,
              '&::-webkit-scrollbar': {
                height: 8,
                backgroundColor: 'background.default',
                borderRadius: 4,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'primary.main',
                borderRadius: 4,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
              scrollbarWidth: 'thin',
              scrollbarColor: 'primary.main background.default',
            }}
          >
            {viewedProducts.map((product) => (
              <StyledCard key={product?._id} elevation={0}>
                <Link 
                  to={`/product/${product?._id}`}
                  style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  {/* Image Container */}
                  <ImageContainer>
                    {/* Recently Viewed Badge */}
                    <Chip
                      label="Recently Viewed"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: 'background.paper',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: 24,
                        zIndex: 1,
                        backdropFilter: 'blur(10px)',
                        boxShadow: 1,
                      }}
                    />

                    <ProductImage
                      className="product-image"
                      src={product?.images?.[0]?.url}
                      alt={product?.name}
                      loading="lazy"
                    />

                  </ImageContainer>

                  {/* Card Content */}
                  <CardContent 
                    sx={{ 
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'background.default',
                      p: 2,
                      '&:last-child': { pb: 2 }
                    }}
                  >
                    {/* Category */}
                    {product?.category && (
                      <Chip
                        label={product.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ 
                          mb: 1, 
                          alignSelf: 'flex-start',
                          fontSize: '0.7rem',
                          height: 24,
                        }}
                      />
                    )}

                    {/* Product Name */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: 48,
                        lineHeight: 1.5,
                        '&:hover': {
                          color: 'primary.main',
                        }
                      }}
                    >
                      {product?.name}
                    </Typography>

                    {/* Rating */}
                    {product?.ratings !== undefined && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Rating 
                          value={product.ratings} 
                          precision={0.5} 
                          size="small" 
                          readOnly 
                          sx={{ fontSize: '0.9rem' }}
                        />
                        {product?.numOfReviews !== undefined && (
                          <Typography variant="caption" color="text.secondary">
                            ({product.numOfReviews})
                          </Typography>
                        )}
                      </Box>
                    )}

                    {/* Spacer */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Price */}
                    <PriceBox>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          color: 'success.dark',
                          lineHeight: 1,
                        }}
                      >
                        ${product?.price?.toFixed(2)}
                      </Typography>
                    </PriceBox>
                  </CardContent>
                </Link>
              </StyledCard>
            ))}
          </Box>

          {/* Right Navigation Button */}
          <NavButton
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={isHovering && canScrollRight ? 'visible' : ''}
            sx={{ right: -24 }}
            aria-label="Scroll right"
          >
            <ArrowForward />
          </NavButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewCarousel;