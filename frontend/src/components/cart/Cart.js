import React from 'react'
import { Box, Container, List, ListItem, ListItemText, Divider, Typography, Paper, Grid, IconButton, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalPrice, setTotalQuantity, setCartItems } from '../../api/actions';
import { AddOutlined, RemoveOutlined, Favorite } from '@mui/icons-material';
import { grey, green } from '@mui/material/colors';

export const Cart = () => {

    const { stateStore } = useSelector(state => state);
    const { cartItems, totalQuantity, totalPrice } = stateStore;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
              Cart ({totalQuantity} items)
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
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
                                                }}>{`$${item.total}`}</Typography>
                                        </Box>
                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }} >
                                            <Box>
                                                <IconButton>
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
                                                <IconButton>
                                                    <AddOutlined />
                                                </IconButton>
                                            </Box>

                                        </Box>
                                    </Box>
                                </Box>

                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                                <Typography variant='subtitle1' color={grey[800]} align={'center'} sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                    Remove
                                </Typography>
                                <Typography variant='subtitle1' color={grey[800]} align={'center'} sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                    <IconButton><Favorite /></IconButton> Save for later
                                </Typography>
                            </Box>
                            {/* {index < cartItems.length - 1 && <Divider />} */}
                        </Paper>
                    ))}
                </Grid>
                <Grid item xs={12} md={4}>
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
                                        <Typography sx={{ fontSize: '1.2em', fontWeight: 'bold', color: green['800'], textDecoration: 'line-through' }}>{`$${totalPrice}`}</Typography>

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
                                        <Typography sx={{ fontSize: '1.2em' }}>Free</Typography>
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
                        <Button variant="contained" color="primary" fullWidth sx={{ padding: '20px', borderRadius: '40px' }}>
                            Proceed to Checkout
                        </Button>
                        </Box>

                    </Paper>
                </Grid>

            </Grid>
        </Box>
    )
}
