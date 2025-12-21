import { Button } from '@mui/material';
import { useCheckoutOrderMutation } from '../../api/services/checkoutApi';
import { useCreatePendingOrderMutation } from '../../api/services/orderApi';
import { useSelector } from 'react-redux';

const Checkout = ({ cartItems, promoCode }) => {
  const [checkoutOrder] = useCheckoutOrderMutation()
  const [createPendingOrder] = useCreatePendingOrderMutation();
  const { auth } = useSelector((state) => state)

  const handleCheckout = async () => {
    const orderResponse = await createPendingOrder({
      cartItems: cartItems,
      userId: auth?.user,
      promoCode: promoCode
    }).unwrap()

    const reqBody = {
      orderId: orderResponse.orderId,
      userId: auth?.user,
      successUrl: `${window.location.origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/cart`
    }
    checkoutOrder(reqBody).then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url
      }


    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div>
      <Button
        variant="contained"
        fullWidth
        sx={{
          padding: '20px',
          borderRadius: '40px',
          color: 'text.main',
          bgcolor: 'success.main',
          fontSize: '1.2em',
          fontWeight: 'bold',
          '&:hover': {

          }
        }}
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Checkout;