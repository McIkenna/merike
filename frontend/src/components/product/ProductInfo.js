import React, {useEffect, useState} from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { green, red, grey } from '@mui/material/colors'
import ReviewRating from '../../utils/ReviewRating'
import { Button, IconButton } from '@mui/material'
import { AddOutlined, RemoveOutlined } from '@mui/icons-material'
import { setQtyPerItem, setTotalPrice, setPricePerItem, setTotalQuantity, setCartItems } from '../../api/actions';
import { useDispatch, useSelector } from 'react-redux';

export const ProductInfo = ({product}) => {
    const dispatch = useDispatch();
    const { stateStore } = useSelector(state => state);
    const { qtyPerItem, totalPrice, pricePerItem, totalQuantity,  cartItems } = stateStore;
    console.log('qtyPerItem', qtyPerItem)
    const addItem = () => {
        dispatch(setQtyPerItem(qtyPerItem + 1));
    };
    const removeItem = () => {
        dispatch(setQtyPerItem(qtyPerItem - 1));
    }
    const addItemToCart = () => {
        const newItem = {
            name: product.name,
            productId: product._id,
            price: product.price,
            quantity: qtyPerItem,
            total: product.price * qtyPerItem
        };

        const existingItem = cartItems.find(item => item.productId === newItem.productId);

        if (existingItem) {
            const updatedCartItems = cartItems.map(item =>
                item.productId === newItem.productId
                    ? { ...item, quantity: item.quantity + newItem.quantity, total: item.total + newItem.total }
                    : item
            );
            dispatch(setCartItems(updatedCartItems));
            dispatch(setTotalPrice(updatedCartItems.reduce((acc, item) => acc + item.total, 0)));
            dispatch(setTotalQuantity(updatedCartItems.reduce((acc, item) => acc + item.quantity, 0)));
        } else {
            dispatch(setCartItems([...cartItems, newItem]));
            dispatch(setTotalPrice(totalPrice + newItem.total));
            dispatch(setTotalQuantity(totalQuantity + qtyPerItem));
        }

        dispatch(setPricePerItem(0));
        dispatch(setQtyPerItem(0));
    };

    console.log('totalPrice', totalPrice)
    console.log('totalQuantity', totalQuantity)
    console.log('cartItems', cartItems)
  return (
    <Box padding={'20px 10px 20px 10px'}>
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Category: {product.category}
                  </Typography>
                  <hr />
                  <ReviewRating value={product.ratings} />
                  <hr />

                  <Typography variant="h6" gutterBottom color={green[800]} paddingTop='20px'>
                    Price: ${product.price}
                  </Typography>
                  <Box
                    sx={{
                      mb: 4,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: '20px'
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        pt: 1,
                        pb: 1,
                        pr: 3,
                        pl: 3,
                        bgcolor: grey[100],
                        borderRadius: 2
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", fontSize: "17px" }}
                      >
                        {qtyPerItem}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex' }}>
                      <IconButton variant="body1" size='large' sx={{ background: red[500], color: 'white', marginRight: '10px' }}
                      onClick={() => removeItem()}>
                        <RemoveOutlined size={2} />
                      </IconButton>
                      <IconButton variant="body1" size='large' sx={{ background: green[500], color: 'white' }}
                      onClick={() => addItem()}>
                        <AddOutlined size={2} />
                      </IconButton>

                    </Box>
                    <Button variant="contained" color="primary"
                      onClick={() => addItemToCart()}>
                      Add to Cart
                    </Button>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color={product.stock > 0 ? green[800] : red[500]} >
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                  </Box>
                  <hr />
                  <Typography variant="body1" paragraph paddingTop={'20px'}>
                    {product.description}
                  </Typography>
                </Box>

  )
}
