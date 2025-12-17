import { useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Card, 
  CardContent, 
  Divider,
  Stack,
  Badge
} from '@mui/material';
import ReviewRating from '../../utils/ReviewRating';
import { Button, IconButton } from '@mui/material';
import { 
  AddOutlined, 
  RemoveOutlined, 
  ShoppingCart,
  LocalShipping,
  Verified,
  Inventory
} from '@mui/icons-material';
import { 
  setQtyPerItem, 
  setTotalPrice, 
  setPricePerItem, 
  setTotalQuantity, 
  setCartItems, 
  setViewedProducts, 
  setCartInspiredProducts
} from '../../api/actions';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { AddItemToCart } from '../cart/cartUtils/AddItemToCart';

const PriceBox = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: theme.spacing(1),
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.success.light,
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const QuantityControl = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(2),
  border: `2px solid ${theme.palette.divider}`,
}));

const InfoCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1),
}));

export const ProductInfo = ({ product, setOpenSnackbar, setSnackbarMessage }) => {
  const dispatch = useDispatch();
  const { stateStore } = useSelector(state => state);
  const { qtyPerItem, totalPrice, totalQuantity, cartItems, viewedProducts, cartInspiredProducts } = stateStore;
  
  const addItem = () => {
    if (qtyPerItem < product.stock) {
      dispatch(setQtyPerItem(qtyPerItem + 1));
    }
  };
  
  const removeItem = () => {
    if (qtyPerItem > 0) {
      dispatch(setQtyPerItem(qtyPerItem - 1));
     
    }
  };

  useEffect(() => {
    if (product) {
      addViewedProduct(product);
      dispatch(setQtyPerItem(0));
    }
  }, [product]);

  const addViewedProduct = (product) => {
    let viewed = [...viewedProducts];
    viewed = viewed.filter((p) => p._id !== product._id);
    const newlyViewed = [product, ...viewed];
    const updatedViewed = newlyViewed.slice(0, 10);
    dispatch(setViewedProducts(updatedViewed));
    localStorage.setItem("viewedProducts", JSON.stringify(updatedViewed));
  };

  const cartInspired = useCallback(() => {
    if (!product) return;

    let inspired = Array.isArray(cartInspiredProducts) ? [...cartInspiredProducts] : [];
    if ((!inspired || inspired.length === 0) && typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('cartInspiredProducts') || '[]');
        if (Array.isArray(stored)) inspired = stored;
      } catch (e) {
        inspired = [];
      }
    }

    const entry = {
      _id: product._id,
      name: product.name,
      image: product.images?.[0]?.url || '',
      price: Number(product.price?.toFixed(2)),
      addedAt: new Date().toISOString()
    };

    if (!inspired.some(i => i._id === entry._id)) {
      inspired.unshift(entry);
      dispatch(setCartInspiredProducts(inspired));
      localStorage.setItem('cartInspiredProducts', JSON.stringify(inspired));
    }
  }, [product, cartInspiredProducts, dispatch]);

  const handleAddToCart = async () => {
    await AddItemToCart(product,qtyPerItem, cartItems, dispatch, setOpenSnackbar, setSnackbarMessage, totalPrice,  totalQuantity)
    cartInspired()
  }

  // const addItemToCart = () => {
  //   const newItem = {
  //     name: product.name,
  //     productId: product._id,
  //     image: product.images[0].url,
  //     price: Number(product.price?.toFixed(2)),
  //     quantity: Number(qtyPerItem),
  //     total: Number(product.price?.toFixed(2) * qtyPerItem)
  //   };

  //   const existingItem = cartItems.find(item => item.productId === newItem.productId);
  //   let updatedCartItems;
  //   let updatedCartPrice;
  //   let updatedCartQuantity;
    
  //   if (existingItem) {
  //     updatedCartItems = cartItems.map(item =>
  //       item.productId === newItem.productId
  //         ? { ...item, quantity: item.quantity + newItem.quantity, total: item.total + newItem.total }
  //         : item
  //     );
  //     updatedCartPrice = updatedCartItems.reduce((acc, item) => acc + item.total, 0);
  //     updatedCartQuantity = updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);
  //     dispatch(setCartItems(updatedCartItems));
  //     dispatch(setTotalPrice(updatedCartPrice));
  //     dispatch(setTotalQuantity(updatedCartQuantity));
  //     setOpenSnackbar(true);
  //     setSnackbarMessage(`Increased ${newItem.name} quantity`);
  //   } else {
  //     updatedCartItems = [...cartItems, newItem];
  //     updatedCartPrice = totalPrice + newItem.total;
  //     updatedCartQuantity = totalQuantity + qtyPerItem;
  //     dispatch(setCartItems(updatedCartItems));
  //     dispatch(setTotalPrice(updatedCartPrice));
  //     dispatch(setTotalQuantity(updatedCartQuantity));
  //     setOpenSnackbar(true);
  //     setSnackbarMessage(`${newItem.name} added to cart`);
  //   }

  //   localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  //   localStorage.setItem('totalPrice', JSON.stringify(updatedCartPrice));
  //   localStorage.setItem('totalQuantity', JSON.stringify(updatedCartQuantity));
  //   dispatch(setPricePerItem(0));
  //   dispatch(setQtyPerItem(0));
  //   cartInspired();
  // };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Product Title and Category */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            color: 'text.primary',
            lineHeight: 1.3
          }}
        >
          {product.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={product.category} 
            color="primary" 
            variant="outlined"
            size="medium"
          />
          {product.stock > 0 ? (
            <Chip 
              icon={<Verified />}
              label="In Stock" 
              color="success"
              size="medium"
            />
          ) : (
            <Chip 
              label="Out of Stock" 
              color="error"
              size="medium"
            />
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Rating Section */}
      <Box sx={{ my: 3 }}>
        <ReviewRating value={product.ratings} />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Price Section */}
      <PriceBox>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            color: 'success.dark'
          }}
        >
          ${product.price?.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          per unit
        </Typography>
      </PriceBox>

      {/* Quantity and Add to Cart Section */}
      <Card 
        elevation={0} 
        sx={{ 
          p: 3, 
          bgcolor: 'background.paper',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          mb: 3
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Select Quantity
        </Typography>
        
        <Stack spacing={3}>
          <QuantityControl>
            <IconButton 
              onClick={removeItem}
              disabled={qtyPerItem === 0}
              sx={{ 
                bgcolor: 'error.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'error.dark',
                },
                '&:disabled': {
                  bgcolor: 'action.disabledBackground',
                }
              }}
            >
              <RemoveOutlined />
            </IconButton>

            <Box 
              sx={{ 
                flex: 1,
                textAlign: 'center',
                px: 3
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: 'primary.main'
                }}
              >
                {qtyPerItem}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {qtyPerItem === 1 ? 'item' : 'items'}
              </Typography>
            </Box>

            <IconButton 
              onClick={addItem}
              disabled={qtyPerItem >= product.stock}
              sx={{ 
                bgcolor: 'success.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'success.dark',
                },
                '&:disabled': {
                  bgcolor: 'action.disabledBackground',
                }
              }}
            >
              <AddOutlined />
            </IconButton>
          </QuantityControl>

          {qtyPerItem > 0 && (
            <Box 
              sx={{ 
                p: 2, 
                bgcolor: 'primary.light',
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Subtotal:
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.dark' }}>
                ${(product.price * qtyPerItem).toFixed(2)}
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            disabled={product.stock === 0 || qtyPerItem === 0}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(4, 76, 171, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(4, 76, 171, 0.4)',
              },
              '&:disabled': {
                bgcolor: 'action.disabledBackground',
                boxShadow: 'none',
              }
            }}
          >
            {product.stock === 0 ? 'Out of Stock' : qtyPerItem === 0 ? 'Select Quantity' : 'Add to Cart'}
          </Button>
        </Stack>
      </Card>

      {/* Features Section */}
      <InfoCard>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Product Features
          </Typography>
          <Stack spacing={1.5}>
            <FeatureItem>
              <LocalShipping color="primary" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Fast Shipping
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Delivery within 5-7 business days
                </Typography>
              </Box>
            </FeatureItem>
            
            <FeatureItem>
              <Verified color="success" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Authentic Product
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  100% genuine and verified
                </Typography>
              </Box>
            </FeatureItem>
            
            <FeatureItem>
              <Inventory color="info" />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Stock Status
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {product.stock > 0 ? `${product.stock} units available` : 'Currently unavailable'}
                </Typography>
              </Box>
            </FeatureItem>
          </Stack>
        </CardContent>
      </InfoCard>

      {/* Description Section */}
      <InfoCard>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Product Description
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              lineHeight: 1.8,
              color: 'text.secondary',
              whiteSpace: 'pre-line'
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
      </InfoCard>
    </Box>
  );
}