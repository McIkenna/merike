import React from 'react'
import { Box, Container, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalPrice, setTotalQuantity, setCartItems } from '../../api/actions';

export const Cart = () => {

    const { stateStore } = useSelector(state => state);
    const { cartItems, totalQuantity, totalPrice } = stateStore;

  return (
    <Box>
         <Container>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>

            <List>
                {cartItems.map((item, index) => (
                    <div key={index}>
                        <ListItem>
                            <ListItemText
                                primary={item.name}
                                secondary={`Price: $${item.price} | Quantity: ${item.quantity} | Total: $${item.total}`}
                            />
                        </ListItem>
                        {index < cartItems.length - 1 && <Divider />}
                    </div>
                ))}
            </List>

            <Typography variant="h6" marginY={2}>
                Total Quantity: {totalQuantity}
            </Typography>
            <Typography variant="h6">
                Total Price: ${totalPrice}
            </Typography>
        </Container>
    </Box>
  )
}
