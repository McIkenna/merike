import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  // Divider,
  Alert
} from "@mui/material";
import { Divider } from '../../utils/Divider';
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useLoginUserMutation } from '../../api/services/userApi';
import { useNavigate } from "react-router";
import { setToken, setUser } from '../../api/actions';
import { Visibility, VisibilityOff, Email, Lock, Login as LoginIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import shoppingImg from '../../static/images/shopping.jpg'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ImageContainer = styled(Box)(() => ({
  background: 'linear-gradient(135deg, #044CAB 0%, #05445E 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '100vh',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
    backgroundSize: '50px 50px',
    animation: 'moveBackground 20s linear infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage: `url(${shoppingImg})`,
    backgroundSize: 'contain',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.35,
    zIndex: 0,
  },
  '@keyframes moveBackground': {
    '0%': {
      transform: 'translate(0, 0)',
    },
    '100%': {
      transform: 'translate(50px, 50px)',
    },
  },
}));

export default function Login() {
  const mediaAboveMd = useMediaQuery('(min-width:900px)');
  const emptyState = {
    email: "",
    password: "",
  };
  
  const [state, setState] = useState(emptyState);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const { auth } = useSelector(state => state);
  const { user, token } = auth;

  useEffect(() => {
    if (user?._id && token) {
      navigate('/');
      const empty = () => {
        setState(emptyState)
        setError('')
      };
      empty();
    }
  }, [user?._id, token, navigate]);

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = state;
    loginUser(reqBody)
      .unwrap()
      .then((response) => {
        localStorage.setItem('token', response?.token);
        localStorage.setItem('user', JSON.stringify(response?.user));
        dispatch(setToken(response?.token));
        dispatch(setUser(response?.user));
      })
      .catch((error) => {
        setError(error?.data?.message || 'Login failed. Please try again.');
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      <Grid container sx={{ flex: 1 }}>
        {/* Left Side - Image/Branding */}
        {mediaAboveMd && (
          <Grid  sx={{ display: { xs: 'none', md: 'block' }}} size={{md:6}}>
            <ImageContainer>
              <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', p: 4 }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}
                >
                  Welcome to Merikemart
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    mb: 4,
                    maxWidth: 500,
                    mx: 'auto',
                    lineHeight: 1.6
                  }}
                >
                  Shop anytime, anywhere. Experience online shopping made simple, reliable, and rewarding.
                </Typography>
                
                {/* Decorative Elements */}
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    mx: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <LoginIcon sx={{ fontSize: 120, color: 'white', opacity: 0.8 }} />
                </Box>
              </Box>
            </ImageContainer>
          </Grid>
        )}

        {/* Right Side - Login Form */}
        <Grid
          size={{
            xs:12,
          md:6}}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, sm: 4 }
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 450 }}>
            {/* Mobile Logo */}
            {!mediaAboveMd && (
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 1
                  }}
                >
                  Merikemart
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A Subsidiary of Merike LLC
                </Typography>
              </Box>
            )}

            <StyledPaper elevation={mediaAboveMd ? 0 : 3}>
              <Box sx={{ mb: 3, textAlign: 'center', width: '100%' }}>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}
                >
                  Sign In
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Welcome back! Please enter your details
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <StyledTextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  value={state.email}
                  onChange={handleStateChange}
                  required
                  autoFocus
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <StyledTextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={state.password}
                  onChange={handleStateChange}
                  required
                  sx={{ mb: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ textAlign: 'right', mb: 2 }}>
                  <Link
                    href="/forgot-password"
                    variant="body2"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(4, 76, 171, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(4, 76, 171, 0.4)',
                    }
                  }}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <Divider >
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Link
                      href="/register"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    By signing in, you agree to our{' '}
                    <Link href="/terms" sx={{ color: 'primary.main' }}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacyPolicy" sx={{ color: 'primary.main' }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </StyledPaper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}