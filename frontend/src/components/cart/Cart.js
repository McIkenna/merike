import React, {useState, useEffect} from 'react'
import { Box, Container, List, ListItem, ListItemText, Divider, Typography, Paper, Grid, IconButton, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalPrice, setTotalQuantity, setCartItems } from '../../api/actions';
import { AddOutlined, RemoveOutlined, Favorite, ArrowBack } from '@mui/icons-material';
import { grey, green, blue } from '@mui/material/colors';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useNavigate } from 'react-router-dom';
import { useCheckoutOrderMutation } from '../../api/services/checkoutApi';
import Checkout from '../checkout/Checkout';
export const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { stateStore, auth } = useSelector(state => state);
    const { cartItems, totalQuantity, totalPrice } = stateStore;

    const [checkoutUrl, setCheckoutUrl] = useState(null);
    const [checkoutOrder, {data, error, isError, isLoading, isSuccess}] = useCheckoutOrderMutation()
    
      // Initialize the Shopify client

      const [loading, setLoading] = useState(false);



    //   const [cartInput, setCartInput] = useState({
    //     lines: [
    //       {
    //         quantity: 1,
    //         merchandiseId: 'gid://shopify/ProductVariant/1',
    //       },
    //     ],
    //   });
    
    //   const handleCheckout = async () => {
    //     try {
    //         const response = await checkoutOrder(cartInput).unwrap();
    //         console.log('Cart created:', response.cartCreate.cart);
          
    //     } catch (err) {
    //       console.error('Failed to create checkout:', err);
    //     }
    //   };



const goToShopify = () => {
    console.log('Go to Shopify called')
    if (data?.webUrl) {
      window.open(data?.webUrl, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(()=>{
    goToShopify()
  }, [data])


    const {user} = auth
    

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

        cartStateUpdate(newCartItems);
    }

    const increaseQuantity = (item) => {
        const newCartItems = cartItems.map(cartItem => {
            if (cartItem.productId === item.productId) {
                const updatedQuantity = cartItem.quantity + 1;

                return {
                    ...cartItem,
                    quantity: updatedQuantity,
                    total: updatedQuantity * cartItem.price
                };
            }
            return cartItem;
        });
        cartStateUpdate(newCartItems);
    }


    const removeItemFromCart = (item) => {
        // Filter out the item to be removed
        const newCartItems = cartItems.filter(cartItem => cartItem.productId !== item.productId);

        cartStateUpdate(newCartItems);
    };

    const cartStateUpdate = (newCartItems) => {
        const totalQuantity = newCartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        const totalPrice = newCartItems.reduce((sum, cartItem) => sum + cartItem.total, 0);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
        dispatch(setCartItems(newCartItems));
        dispatch(setTotalQuantity(totalQuantity));
        dispatch(setTotalPrice(totalPrice));
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Cart ({totalQuantity} items)
            </Typography>
            {cartItems.length > 0 ? <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Items
                        </Typography>

                        {cartItems.map((item, index) => (
                            <Paper elevation={1} sx={{ margin: '10px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                                    <Box>
                                        <img src={item?.image} alt={item.name} style={{ width: '100px' }} />
                                    </Box>
                                    <Box>
                                        <ListItem>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={`Price: $${item.price}`}
                                                primaryTypographyProps={{ fontSize: '1.2em' }}
                                                secondaryTypographyProps={{ variant: 'subtitle1' }}
                                                sx={{ padding: '20px' }}
                                            />
                                        </ListItem>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Box>

                                            <Box sx={{ alignItems: 'center', padding: '10px' }}>
                                                <Typography variant='h6' color={green[800]} align={'center'}
                                                    sx={{
                                                        fontWeight: 'bolder',
                                                    }}>{`$${item.total?.toFixed(2)}`}</Typography>
                                            </Box>
                                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }} >
                                                <Box>
                                                    <IconButton onClick={() => decreaseQuantity(item)}>
                                                        <RemoveOutlined />
                                                    </IconButton>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        pt: 1,
                                                        pb: 1,
                                                        pr: 2,
                                                        pl: 2,
                                                        bgcolor: grey[100],
                                                        borderRadius: 2
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: "bold", fontSize: "17px" }}
                                                    >
                                                        {item.quantity}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <IconButton onClick={() => increaseQuantity(item)}>
                                                        <AddOutlined />
                                                    </IconButton>
                                                </Box>

                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                                    <Typography variant='subtitle1' color={grey[800]} align={'center'} sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => removeItemFromCart(item)}>
                                        Remove
                                    </Typography>
                                    <Typography variant='subtitle1' color={grey[800]} align={'center'} sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                        <IconButton><Favorite /></IconButton> Save for later
                                    </Typography>
                                </Box>
                                {/* {index < cartItems.length - 1 && <Divider />} */}
                            </Paper>
                        ))}
                    </Box>

                </Grid>
                <Grid item xs={12} md={4}>
                    {cartItems.length > 0 &&
                        <Box>
                            <Box>
                                <Typography variant="h5" gutterBottom>
                                    Order Summary
                                </Typography>
                            </Box>
                            <Paper elevation={1}>
                                <Box
                                    sx={{
                                        padding: '20px'
                                    }}>

                                    <Box>
                                        <List>
                                            <ListItem sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '5px'
                                            }}>
                                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Subtotal</Typography>
                                                <Typography sx={{ fontSize: '1.2em', fontWeight: 'bold', color: green['800'], textDecoration: 'line-through' }}>{`$${totalPrice?.toFixed(2)}`}</Typography>

                                            </ListItem>
                                            <ListItem sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '5px'
                                            }}>
                                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Savings</Typography>
                                                <Typography sx={{
                                                    fontSize: '1.1em',
                                                    color: grey[700],

                                                }}>{`-$${50}`}</Typography>

                                            </ListItem>

                                            <ListItem sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '5px'
                                            }}>
                                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}></Typography>
                                                <Typography sx={{
                                                    fontSize: '1.2em',
                                                    fontWeight: 'bold',
                                                    color: green['800'],
                                                }}>{`$${200}`}</Typography>

                                            </ListItem>
                                            {<Divider />}
                                            <ListItem
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '20px'
                                                }}>
                                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Shipping</Typography>
                                                <Typography sx={{ fontSize: '1.2em' }}>Calculated during checkout</Typography>
                                            </ListItem>
                                            <ListItem
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '20px'
                                                }}>
                                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Taxes</Typography>
                                                <Typography sx={{ fontSize: '1.2em' }}>Calculated during checkout</Typography>
                                            </ListItem>
                                            {<Divider />}
                                            <ListItem
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '20px'
                                                }}>
                                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Estimated Total</Typography>
                                                <Typography sx={{ fontSize: '1.2em' }}>Calculated during checkout</Typography>
                                            </ListItem>
                                        </List>
                                    </Box>

                                </Box>
                                <Box sx={{ padding: '20px' }}>
                                {!user?._id ?  <Button variant="contained" color="primary" fullWidth sx={{ padding: '20px', borderRadius: '40px' }} disabled={!user?._id}
                                    // onClick={() => navigate('/checkout')}
                                    >
                                       Login to Checkout
                                    </Button> :
                                    <Checkout cartItems={cartItems}/>
                                            }
                                </Box>

                            </Paper>
                            <Box sx={{ color: blue['500'], display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20px' }}>
                                <ArrowBack sx={{ paddingRight: '10px'}}/>
                                <Typography variant="h6" sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/')}>
                                    Continue Shopping
                                </Typography>
                            </Box>
                        </Box>}
                </Grid>

            </Grid>
                :
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50vh'
                    }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ProductionQuantityLimitsIcon sx={{ fontSize: '7em', color: grey['500'] }} />
                        <Typography variant="h4" sx={{ color: grey['500'], paddingTop: '20px' }}>
                            Your cart is empty, add product to cart
                        </Typography>
                        <Box sx={{ color: blue['500'], display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20px' }}>
                            <ArrowBack sx={{ paddingRight: '10px'}}/>
                            <Typography variant="h6" sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/')}>
                                Start Shopping
                            </Typography>
                        </Box>


                    </Box>

                </Box>
            }
        </Box>
    )
}
