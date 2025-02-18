import React, { useEffect, useState } from 'react';
import Client from 'shopify-buy';
import { Button } from '@mui/material';
import { useCheckoutOrderMutation } from '../../api/services/checkoutApi';
import { useSelector } from 'react-redux';

const Checkout = ({cartItems}) => {
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [checkoutOrder, {error, isLoading}] = useCheckoutOrderMutation()
  const { auth} = useSelector((state) =>state)

  const handleCheckout =() =>{

    const reqBody = {
        cartItems: cartItems,
        userId : auth?.user
    }
    checkoutOrder(reqBody).then((res) => {
        if(res.data.url){
            window.location.href = res.data.url
        }
        console.log('res -->', res)
    }).catch( err => {
        console.log(err)
    })

  }
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ padding: '20px', borderRadius: '40px' }}
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Checkout;