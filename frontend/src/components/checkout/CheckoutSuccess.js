import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setCartItems, setTotalPrice, setTotalQuantity } from '../../api/actions';
import { useDispatch } from 'react-redux';
const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    dispatch(setCartItems([]))
    dispatch(setTotalPrice(0))
    dispatch(setTotalQuantity(0))
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('totalQuantity')
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Thank you for your purchase!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your order has been successfully placed.
        </Typography>
        <Typography variant="body1" gutterBottom>
          You will receive an email confirmation shortly.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
        <Typography variant="body2" sx={{ mt: 3 }}>
          Redirecting to home in {countdown} seconds...
        </Typography>
      </Box>
    </Container>
  );
};

export default CheckoutSuccess;
