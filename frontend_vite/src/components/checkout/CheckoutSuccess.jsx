import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
    Stack,
    LinearProgress,
    Fade,
    Zoom,
    Chip
} from '@mui/material';
import {
    CheckCircle,
    Email,
    ShoppingBag,
    ArrowForward,
    Receipt,
    Home
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setCartItems, setTotalPrice, setTotalQuantity, removePromoCode } from '../../api/actions';
import { useDispatch } from 'react-redux';
import { styled, keyframes } from '@mui/material/styles';
import { Divider } from '../../utils/Divider';

// Animations
const checkAnimation = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const SuccessIconBox = styled(Box)(({ theme }) => ({
    width: 120,
    height: 120,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    marginBottom: theme.spacing(3),
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: theme.palette.success.light,
        animation: `${pulseAnimation} 2s ease-in-out infinite`,
        zIndex: -1,
    }
}));

const AnimatedCheckIcon = styled(CheckCircle)(({ theme }) => ({
    fontSize: 70,
    color: theme.palette.success.main,
    animation: `${checkAnimation} 0.6s ease-out`,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    borderRadius: theme.spacing(3),
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    animation: `${fadeInUp} 0.6s ease-out`,
}));

const FeatureBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.background.default,
    border: '1px solid',
    borderColor: theme.palette.divider,
}));

const CountdownCircle = styled(Box)(({ theme, progress }) => ({
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: `conic-gradient(
        ${theme.palette.primary.main} ${progress * 3.6}deg,
        ${theme.palette.background.default} ${progress * 3.6}deg
    )`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: theme.palette.background.paper,
    }
}));

const CheckoutSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('order_id');
    
    const [countdown, setCountdown] = useState(10);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Show content after brief delay for animation
        const showTimer = setTimeout(() => {
            setShowContent(true);
        }, 100);

        // Clear cart
        dispatch(setCartItems([]));
        dispatch(setTotalPrice(0));
        dispatch(setTotalQuantity(0));
        dispatch(removePromoCode());
        
        localStorage.removeItem('cartItems');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('totalQuantity');
        localStorage.removeItem('promoCode');

        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            clearTimeout(showTimer);
        };
    }, [navigate, dispatch]);

    const handleContinueShopping = () => {
        navigate('/');
    };

    const handleViewOrders = () => {
        navigate('/order');
    };

    const progress = ((10 - countdown) / 10) * 100;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                <Fade in={showContent} timeout={600}>
                    <StyledPaper elevation={0}>
                        {/* Success Icon */}
                        <Zoom in={showContent} timeout={800}>
                            <SuccessIconBox>
                                <AnimatedCheckIcon />
                            </SuccessIconBox>
                        </Zoom>

                        {/* Success Badge */}
                        <Chip
                            label="Payment Successful"
                            color="success"
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                mb: 2,
                            }}
                        />

                        {/* Main Heading */}
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: 'text.primary',
                            }}
                        >
                            Thank You!
                        </Typography>

                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            Your order has been placed successfully
                        </Typography>

                        {/* Order/Session ID */}
                        {(orderId || sessionId) && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: 'block',
                                    mb: 3,
                                    fontFamily: 'monospace',
                                    bgcolor: 'background.default',
                                    py: 1,
                                    px: 2,
                                    borderRadius: 1
                                }}
                            >
                                Order ID: {orderId?.slice(0, 8).toUpperCase() || sessionId?.slice(-8).toUpperCase()}
                            </Typography>
                        )}

                        <Divider />

                        {/* Features */}
                        <Stack spacing={2} sx={{ mb: 4, textAlign: 'left' }}>
                            <FeatureBox>
                                <Email color="primary" />
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Confirmation Email Sent
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Check your inbox for order details
                                    </Typography>
                                </Box>
                            </FeatureBox>

                            <FeatureBox>
                                <Receipt color="primary" />
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Order Processing
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        We'll notify you when it ships
                                    </Typography>
                                </Box>
                            </FeatureBox>
                        </Stack>

                        {/* Action Buttons */}
                        <Stack spacing={2} sx={{ mb: 3 }}>
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<Receipt />}
                                onClick={handleViewOrders}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                }}
                            >
                                View Order Details
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                fullWidth
                                startIcon={<ShoppingBag />}
                                onClick={handleContinueShopping}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Stack>

                        <Divider />

                        {/* Countdown */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                            }}
                        >
                            <CountdownCircle progress={progress}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        position: 'relative',
                                        zIndex: 1,
                                    }}
                                >
                                    {countdown}
                                </Typography>
                            </CountdownCircle>

                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Auto-redirect
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Returning to homepage in {countdown}s
                                </Typography>
                            </Box>
                        </Box>

                        {/* Progress Bar */}
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                mt: 3,
                                height: 6,
                                borderRadius: 3,
                                bgcolor: 'background.default',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 3,
                                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                                },
                            }}
                        />
                    </StyledPaper>
                </Fade>

                {/* Security Notice */}
                <Fade in={showContent} timeout={1000}>
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Typography variant="caption" color="text.secondary">
                            🔒 Your payment was processed securely via Stripe
                        </Typography>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default CheckoutSuccess;