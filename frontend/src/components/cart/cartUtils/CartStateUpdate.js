import React from 'react'
import { useDispatch } from 'react-redux';
import { setCartItems, setTotalPrice, setTotalQuantity } from '../../../api/actions';

export const CartStateUpdate = (newCartItems, dispatch) => {
      const totalQuantity = newCartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
      const totalPrice = newCartItems.reduce((sum, cartItem) => sum + cartItem.total, 0);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
      localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
      dispatch(setCartItems(newCartItems));
      dispatch(setTotalQuantity(totalQuantity));
      dispatch(setTotalPrice(totalPrice));
}
