import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Chip,
  CircularProgress,
  InputAdornment,
  IconButton,
  Collapse, 
  Typography
} from '@mui/material';
import { LocalOffer, Close, CheckCircle } from '@mui/icons-material';
import { useValidatePromoCodeMutation } from '../../api/services/promoCodeApi';
import { setPromoCode, removePromoCode } from '../../api/actions';
import {styled} from '@mui/material/styles';

 const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),

    // input text

    // fieldset (border)
    '& fieldset': {
      borderColor: theme.palette.background.dark,
    },

    '&:hover fieldset': {
      borderColor: theme.palette.background.paper,
    },

   
  },
  '& .MuiOutlinedInput-input::placeholder': {
  color: theme.palette.text.dark,
  opacity: 1, // important for Firefox
},
'& .MuiOutlinedInput-input': {
  color: theme.palette.primary.dark
},
}));

const PromoCodeInput = (props) => {
  const { cartItems, totalPrice, promoCode, discount, dispatch } = props;
  
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [validatePromoCode, { isLoading }] = useValidatePromoCodeMutation();

  const handleApply = async () => {
    if (!code.trim()) {
      setError('Please enter a promo code');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const response = await validatePromoCode({
        code: code.toUpperCase(),
        cartItems,
        cartTotal: totalPrice
      }).unwrap();

      console.log('response ->Promo', response)

      if (response.success) {
        dispatch(setPromoCode({promoCode: response.promoCode.code, discount: response.discount}));
        setSuccess(response.message);
        setCode('');
      }
    } catch (err) {
      setError(err.data?.message || 'Invalid promo code');
    }
  };

  const handleRemove = () => {
    dispatch(removePromoCode());
    setCode('');
    setError('');
    setSuccess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApply();
    }
  };

  const handleInput = (e) => {
    const {value } = e.target;

        setCode(value.toUpperCase());

  }


console.log('discount -->', discount)
console.log('promoCode -->', promoCode)
  return (
    <Box sx={{ mb: 3 }}>
      {promoCode ? (
        <Box>
          <Chip
            icon={<CheckCircle />}
            label={`${promoCode} applied - $${discount.toFixed(2)} off`}
            onDelete={handleRemove}
            
            sx={{ mb: 2, fontWeight: 600, color: "success.main" }}
          />
          <Collapse in={!!success}>
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          </Collapse>
        </Box>
      ) : (
        <Box>
          <StyledTextField
            fullWidth
            placeholder="Enter promo code"
            value={code}
            onChange={handleInput}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalOffer sx={{color: 'background.dark'}} />
                </InputAdornment>
              ),
              endAdornment: isLoading && (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={handleApply}
            disabled={isLoading }
            sx={{ textTransform: 'none', bgcolor: 'success.light', color: 'text.primary'}}
          >
            Apply Promo Code
          </Button>

          <Collapse in={!!error}>
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};

export default PromoCodeInput;