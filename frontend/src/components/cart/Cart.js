import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Badge,
  Alert,
  Collapse
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalPrice, setTotalQuantity, setCartItems } from '../../api/actions';
import {
  AddOutlined,
  RemoveOutlined,
  DeleteOutline,
  ShoppingCartOutlined,
  LocalOffer,
  Security,
  LocalShipping,
  ArrowForward,
  ShoppingBag
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCheckoutOrderMutation } from '../../api/services/checkoutApi';
import Checkout from '../checkout/Checkout';
import { styled } from '@mui/material/styles';
import { CartStateUpdate } from './cartUtils/CartStateUpdate';
import { CustomSnackbar } from '../../utils/CustomSnackbar';
import PromoCodeInput from '../promoCode/PromoCodeInput';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  border: '2px solid',
  borderColor: theme.palette.divider,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
  },
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  position: 'sticky',
  top: 100,
  border: '2px solid',
  borderColor: theme.palette.primary.main,
}));

const EmptyCartBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  fontWeight: 600,
  '& .MuiChip-icon': {
    marginLeft: theme.spacing(1),
  },
}));

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stateStore, auth } = useSelector(state => state);
  const { cartItems, totalQuantity, totalPrice, discount, promoCode, products } = stateStore;
  const { user } = auth;
  const [showSavings, setShowSavings] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')

  const [{ data }] = useCheckoutOrderMutation();

  const goToShopify = () => {
    if (data?.webUrl) {
      window.open(data?.webUrl, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    goToShopify();
  }, [data]);

  const decreaseQuantity = (item) => {
    const newCartItems = cartItems.reduce((acc, cartItem) => {
      if (cartItem.productId === item.productId) {
        const updatedQuantity = cartItem.quantity - 1;
        if (updatedQuantity > 0) {
          acc.push({
            ...cartItem,
            quantity: updatedQuantity,
            total: updatedQuantity * cartItem.price
          });
        }
      } else {
        acc.push(cartItem);
      }
      return acc;
    }, []);

    CartStateUpdate(newCartItems, dispatch);
    // setOpenSnackbar(true)
    // setSnackbarMessage(`${item?.name} quantity decreased`)
    // setSeverity("warning")
  };

  const findProductStock = (item, updatedQuantity) => {
    const foundProduct = products?.find(product => product?._id === item.productId);
    if (updatedQuantity <= foundProduct?.stock) return true;
    return false;
  }

  const increaseQuantity = (item) => {
    let shouldUpdate = false;
    const newCartItems = cartItems.map(cartItem => {

      if (cartItem.productId === item.productId) {
        const updatedQuantity = cartItem.quantity + 1;
        shouldUpdate = findProductStock(item, updatedQuantity)

        if (shouldUpdate) {
          return {
            ...cartItem,
            quantity: updatedQuantity,
            total: updatedQuantity * cartItem.price
          };
        }

      }
      return cartItem;
    });
    if (shouldUpdate) {
      CartStateUpdate(newCartItems, dispatch);
      // setOpenSnackbar(true)
      // setSnackbarMessage(`${item?.name} quantity increased`)
      // setSeverity("success")
    }else{
      setOpenSnackbar(true)
      setSnackbarMessage(`Out of Stock for ${item?.name}`)
      setSeverity("warning")
    }

  };

  const removeItemFromCart = (item) => {
    const newCartItems = cartItems.filter(cartItem => cartItem.productId !== item.productId);
    CartStateUpdate(newCartItems, dispatch);
    setOpenSnackbar(true)
    setSnackbarMessage(`${item?.name} was removed from cart`)
    setSeverity("warning")
  };



  // const truncatedCartItems = useMemo(() => {
  //   if (!cartItems || cartItems.length === 0) return null;
  //   return cartItems.map(item => ({
  //     ...item,
  //     name: item.name.length > 10 ? item.name.slice(0, 10) : item.name
  //   }));
  // }, [cartItems]);

  const estimatedTotal = totalPrice - discount;

  console.log('cartItems ===>', cartItems)

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <EmptyCartBox>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: 'primary.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <ShoppingCartOutlined sx={{ fontSize: 60, color: 'primary.main' }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
            Looks like you haven't added anything to your cart yet. Start shopping and discover amazing products!
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingBag />}
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
        </EmptyCartBox>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <ShoppingCartOutlined sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Shopping Cart
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your cart
            </Typography>
          </Box>
        </Box>

        {/* Feature Chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
          <FeatureChip
            icon={<Security />}
            label="Secure Checkout"
            color="success"
            variant="outlined"
            size="small"
          />
          <FeatureChip
            icon={<LocalShipping />}
            label="Fast Delivery"
            color="primary"
            variant="outlined"
            size="small"
          />
          <FeatureChip
            icon={<LocalOffer />}
            label="Best Prices"
            color="error"
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Box>
            {cartItems.map((item, index) => (
              <StyledCard key={item.productId} elevation={0}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    {/* Product Image */}
                    <Grid item xs={3} sm={2}>
                      <Box
                        sx={{
                          width: '100%',
                          aspectRatio: '1/1',
                          borderRadius: 2,
                          overflow: 'hidden',
                          bgcolor: 'background.default',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={item?.image}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    </Grid>

                    {/* Product Info */}
                    <Grid item xs={9} sm={5}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        ${item.price.toFixed(2)} per unit
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<DeleteOutline />}
                        onClick={() => removeItemFromCart(item)}
                        sx={{
                          color: 'error.main',
                          textTransform: 'none',
                          '&:hover': {
                            bgcolor: 'error.light',
                          },
                        }}
                      >
                        Remove
                      </Button>
                    </Grid>

                    {/* Quantity Controls */}
                    <Grid item xs={12} sm={5}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: { xs: 'space-between', sm: 'flex-end' },
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: 0.5,
                            borderRadius: 2,
                          }}
                        >
                          <QuantityButton
                            size="small"
                            onClick={() => decreaseQuantity(item)}
                          >
                            <RemoveOutlined fontSize="small" />
                          </QuantityButton>
                          <Typography
                            sx={{
                              minWidth: 40,
                              textAlign: 'center',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <QuantityButton
                            size="small"
                            onClick={() => increaseQuantity(item)}
                          >
                            <AddOutlined fontSize="small" />
                          </QuantityButton>
                        </Box>

                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="caption" color="text.secondary">
                            Total
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: 'success.main',
                            }}
                          >
                            ${item.total.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            ))}
          </Box>

          {/* Continue Shopping */}
          <Button
            variant="outlined"
            startIcon={<ArrowForward sx={{ transform: 'rotate(180deg)' }} />}
            onClick={() => navigate('/')}
            sx={{
              mt: 2,
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            Continue Shopping
          </Button>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <SummaryCard elevation={3}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Order Summary
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1.5,
                }}
              >
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1.5,
                  p: 1.5,
                  bgcolor: 'success.contrastText',
                  borderRadius: 1,
                }}
              >
                <PromoCodeInput
                  cartItems={cartItems}
                  totalPrice={totalPrice}
                  promoCode={promoCode}
                  discount={discount}
                  dispatch={dispatch}
                />
                {/* <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.dark' }}>
                    Savings
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: 'success.dark' }}>
                    -${savings.toFixed(2)}
                  </Typography> */}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1.5,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Shipping
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Calculated at checkout
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Taxes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Calculated at checkout
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 2,
                  bgcolor: 'primary.light',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Estimated Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.dark' }}>
                  ${estimatedTotal.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* Checkout Button */}
            {!user?._id ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                Please log in to proceed with checkout
              </Alert>
            ) : null}

            {!user?._id ? (
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Login to Checkout
              </Button>
            ) : (
              <Checkout cartItems={cartItems} discount={discount} promoCode={promoCode} />
            )}

            {/* Security Badge */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                mt: 2,
                p: 1.5,
                bgcolor: 'background.default',
                borderRadius: 1,
              }}
            >
              <Security color="success" fontSize="small" />
              <Typography variant="caption" color="text.secondary">
                Secure SSL Encrypted Checkout
              </Typography>
            </Box>
          </SummaryCard>
          <CustomSnackbar
            openSnackbar={openSnackbar}
            snackbarMessage={snackbarMessage}
            setOpenSnackbar={setOpenSnackbar}
            severity={severity}
          />
        </Grid>
      </Grid>
    </Container>
  );
}