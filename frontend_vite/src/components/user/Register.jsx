import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  Link,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  LinearProgress
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router";
import { useCreateUserMutation } from "../../api/services/userApi";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../api/actions";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  CheckCircle,
  PersonAdd,
  ShoppingBag
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  backgroundColor: theme.palette.background.paper,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    transition: 'all 0.3s ease',
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderWidth: 2,
    },
  },
}));

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #116530 0%, #75E6DA 100%)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: theme.spacing(2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  marginBottom: theme.spacing(2),
}));

const PasswordStrengthBar = ({ password }) => {
  const getStrength = () => {
    if (!password) return { value: 0, label: '', color: 'error' };
    if (password.length < 6) return { value: 25, label: 'Weak', color: 'error' };
    if (password.length < 8) return { value: 50, label: 'Fair', color: 'warning' };
    if (password.length < 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { value: 75, label: 'Good', color: 'info' };
    }
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { value: 100, label: 'Strong', color: 'success' };
    }
    return { value: 60, label: 'Fair', color: 'warning' };
  };

  const strength = getStrength();

  return (
    <Box sx={{ mt: 1 }}>
      <LinearProgress 
        variant="determinate" 
        value={strength.value} 
        color={strength.color}
        sx={{ height: 6, borderRadius: 3 }}
      />
      {strength.label && (
        <Typography variant="caption" color={`${strength.color}.main`} sx={{ mt: 0.5, display: 'block' }}>
          Password Strength: {strength.label}
        </Typography>
      )}
    </Box>
  );
};

export default function Register() {
  const dispatch = useDispatch();
  const mediaAboveMd = useMediaQuery('(min-width:900px)');
  const emptyState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  
  const [userData, setUserData] = useState(emptyState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { auth } = useSelector(state => state);
  const { user } = auth;
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();

  useEffect(() => {
    if (user?._id) {
      navigate('/');
    }
  }, [user?._id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setError((prevState) => ({
      ...prevState,
      [name]: {
        error: false,
        errorMessage: ''
      }
    }));
  };

  const errorStatus = {
    firstName: { error: false, errorMessage: '' },
    lastName: { error: false, errorMessage: '' },
    email: { error: false, errorMessage: '' },
    password: { error: false, errorMessage: '' },
    confirmPassword: { error: false, errorMessage: '' }
  };

  const [error, setError] = useState(errorStatus);
  const [errorMessages, setErrorMessages] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const requiredFields = ["firstName", "lastName", "email", "password", "confirmPassword"];
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!userData[field]) {
        setError((prevState) => ({
          ...prevState,
          [field]: {
            error: true,
            errorMessage: "This field is required"
          }
        }));
        isValid = false;
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email && !emailPattern.test(userData.email)) {
      setError((prevState) => ({
        ...prevState,
        email: {
          error: true,
          errorMessage: "Invalid email address"
        }
      }));
      isValid = false;
    }

    if (userData.password && userData.password.length < 6) {
      setError((prevState) => ({
        ...prevState,
        password: {
          error: true,
          errorMessage: "Password must be at least 6 characters"
        }
      }));
      isValid = false;
    }

    if (userData.password !== userData.confirmPassword) {
      setError((prevState) => ({
        ...prevState,
        confirmPassword: {
          error: true,
          errorMessage: "Passwords do not match"
        }
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages('');
    setSuccessMessage('');
    
    const isValid = validate();
    
    if (isValid) {
      const reqBody = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      };
      
      createUser(reqBody)
        .unwrap()
        .then((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          dispatch(setToken(res.token));
          dispatch(setUser(res.user));
          setSuccessMessage('Account created successfully! Redirecting...');
        })
        .catch((err) => {
          setErrorMessages(err.data?.message || 'Registration failed. Please try again.');
        });
    }
  };

  const features = [
    { icon: <ShoppingBag />, text: 'Access to thousands of products' },
    { icon: <CheckCircle />, text: 'Exclusive deals and offers' },
    { icon: <CheckCircle />, text: 'Fast and secure checkout' },
  ];

  return (
    <GradientBox>
      <Grid container sx={{ maxWidth: 1200, width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Left Side - Branding */}
        {mediaAboveMd && (
          <Grid item size={{md:5}} sx={{ display: 'flex', alignItems: 'center', pr: 4 }}>
            <Box sx={{ color: 'white' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Join Merikemart Today
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
                Create your account and start shopping with confidence. Experience the best online shopping platform.
              </Typography>

              {features.map((feature, index) => (
                <FeatureCard key={index}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="body1">{feature.text}</Typography>
                </FeatureCard>
              ))}

              <Box sx={{ mt: 4, p: 3, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  "Merikemart has transformed my shopping experience. Fast delivery, great prices, and excellent customer service!"
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, display: 'block', fontWeight: 600 }}>
                  - Sarah M., Verified Customer
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}

        {/* Right Side - Registration Form */}
        <Grid item size={{xs:12, md:7}}>
          <StyledPaper elevation={8}>
            {/* Mobile Header */}
            {!mediaAboveMd && (
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  Merikemart
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A Subsidiary of Merike LLC
                </Typography>
              </Box>
            )}

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PersonAdd color="primary" fontSize="large" />
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Create Account
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Fill in your details to get started
              </Typography>
            </Box>

            {errorMessages && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessages}
              </Alert>
            )}

            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item size={{xs:12, sm:6}}>
                  <StyledTextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    value={userData.firstName}
                    onChange={handleChange}
                    error={error.firstName.error}
                    helperText={error.firstName.errorMessage}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item size={{xs:12, sm:6}}>
                  <StyledTextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    value={userData.lastName}
                    onChange={handleChange}
                    error={error.lastName.error}
                    helperText={error.lastName.errorMessage}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item size={{xs:12}}>
                  <StyledTextField
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    error={error.email.error}
                    helperText={error.email.errorMessage}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item size={{xs:12}}>
                  <StyledTextField
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={userData.password}
                    onChange={handleChange}
                    error={error.password.error}
                    helperText={error.password.errorMessage}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {userData.password && <PasswordStrengthBar password={userData.password} />}
                </Grid>
                <Grid item size={{xs:12}}>
                  <StyledTextField
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    error={error.confirmPassword.error}
                    helperText={error.confirmPassword.errorMessage}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #116530 30%, #75E6DA 90%)',
                  boxShadow: '0 4px 12px rgba(17, 101, 48, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0d4f25 30%, #5dd4c6 90%)',
                    boxShadow: '0 6px 16px rgba(17, 101, 48, 0.4)',
                  },
                  '&:disabled': {
                    background: 'rgba(0, 0, 0, 0.12)',
                  }
                }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  By creating an account, you agree to our{' '}
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
        </Grid>
      </Grid>
    </GradientBox>
  );
}