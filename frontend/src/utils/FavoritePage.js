import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Chip,
  Rating,
  Divider
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  ShoppingCart,
  Delete,
  ArrowForward
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { setFavorites } from '../api/actions';
import { AddItemToCart } from '../components/cart/cartUtils/AddItemToCart';
import { CustomSnackbar } from './CustomSnackbar';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  border: '1px solid',
  borderColor: theme.palette.divider,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.error.main,
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

const ProductImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  padding: '16px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const FavoriteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  zIndex: 2,
  '&:hover': {
    backgroundColor: theme.palette.error.light,
    transform: 'scale(1.1)',
  },
  transition: 'all 0.2s ease',
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

const EmptyStateBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

export const FavoritePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stateStore } = useSelector(state => state);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('success')

  const { favorites, products, totalPrice, totalQuantity, cartItems } = stateStore;
  // Correctly map favorite IDs to their corresponding products
  const favoriteProducts = useMemo(() => {
    if (!products || products?.length === 0 || !favorites || favorites.length === 0) {
      return [];
    }

    // Filter products that exist in favorites array
    return products?.filter(product => favorites?.includes(product?._id));
  }, [products, favorites]);

  const handleRemoveFavorite = (productId) => {
    const updatedFavorites = favorites.filter(id => id !== productId);
    dispatch(setFavorites(updatedFavorites));
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleClearAll = () => {
    dispatch(setFavorites([]));
    localStorage.setItem('favorites', JSON.stringify([]));
  };

 

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (product) => {
      await AddItemToCart(
        product,
        1, 
        cartItems, 
        dispatch, 
        setOpenSnackbar, 
        setSnackbarMessage, 
        setSeverity,
        totalPrice,  
        totalQuantity)

        
    }

  // Empty State
  if (favoriteProducts.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <EmptyStateBox>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: 'error.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <FavoriteBorder sx={{ fontSize: 60, color: 'error.main' }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            No Favorites Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
            Start adding products to your favorites to see them here. Browse our collection and save items you love!
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
            }}
          >
            Start Shopping
          </Button>
        </EmptyStateBox>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Favorite sx={{ fontSize: 40, color: 'error.main' }} />
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                My Favorites
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} saved
              </Typography>
            </Box>
          </Box>
          
          {favoriteProducts.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={handleClearAll}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
              }}
            >
              Clear All
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label={`${favoriteProducts.length} Products`}
            color="error"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label={`Total Value: $${favoriteProducts.reduce((sum, p) => sum + (p.price || 0), 0).toFixed(2)}`}
            color="success"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {favoriteProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <StyledCard elevation={0}>
              {/* Image Container */}
              <ImageContainer>
                <FavoriteButton
                  onClick={() => handleRemoveFavorite(product._id)}
                  aria-label="remove from favorites"
                >
                  <Favorite fontSize="small" color="error" />
                </FavoriteButton>

                <ProductImage
                  src={product.images?.[0]?.url || product.image}
                  alt={product.name}
                  loading="lazy"
                  onClick={() => handleViewProduct(product._id)}
                  style={{ cursor: 'pointer' }}
                />
              </ImageContainer>

              {/* Card Content */}
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                {/* Category */}
                {product.category && (
                  <Chip
                    label={product.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1, alignSelf: 'flex-start', fontSize: '0.7rem' }}
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
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                  onClick={() => handleViewProduct(product._id)}
                >
                  {product.name}
                </Typography>

                {/* Rating */}
                {product.ratings !== undefined && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating
                      value={product.ratings}
                      precision={0.5}
                      size="small"
                      readOnly
                      sx={{ fontSize: '0.9rem' }}
                    />
                    {product.numOfReviews !== undefined && (
                      <Typography variant="caption" color="text.secondary">
                        ({product.numOfReviews})
                      </Typography>
                    )}
                  </Box>
                )}

                {/* Stock Status */}
                {product.stock !== undefined && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: product.stock > 0 ? 'success.main' : 'error.main',
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </Typography>
                )}

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Price and Actions */}
                <Box sx={{ mt: 2 }}>
                  <PriceBox sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'success.dark',
                        lineHeight: 1,
                      }}
                    >
                      ${product.price?.toFixed(2)}
                    </Typography>
                  </PriceBox>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="small"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        py: 1,
                        fontWeight: 600,
                      }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveFavorite(product._id)}
                      sx={{
                        border: '1px solid',
                        borderColor: 'error.main',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'error.light',
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Continue Shopping */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Button
          variant="outlined"
          size="large"
          endIcon={<ArrowForward />}
          onClick={() => navigate('/')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          Continue Shopping
        </Button>
      </Box>
      <CustomSnackbar
      openSnackbar={openSnackbar}
      snackbarMessage={snackbarMessage}
      setOpenSnackbar={setOpenSnackbar}
      setSeverity={setSeverity} />
    </Container>
  );
}