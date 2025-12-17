import { Button } from '@mui/material';
import { useCheckoutOrderMutation } from '../../api/services/checkoutApi';
import { useSelector } from 'react-redux';

const Checkout = ({ cartItems }) => {
  const [checkoutOrder] = useCheckoutOrderMutation()
  const { auth } = useSelector((state) => state)

  const handleCheckout = () => {

    const reqBody = {
      cartItems: cartItems,
      userId: auth?.user
    }
    checkoutOrder(reqBody).then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url
      }
      console.log('res -->', res)
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
          color: 'text.white',
          bgcolor: 'success.main',
          fontSize: '1.2em',
          fontWeight: 'bold',
          '&:hover':{

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