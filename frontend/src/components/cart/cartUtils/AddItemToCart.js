import { setCartItems, setTotalPrice, setTotalQuantity, setPricePerItem, setQtyPerItem } from "../../../api/actions";
import { useState } from "react";

export const AddItemToCart = async(product, qtyPerItem, cartItems, dispatch, setOpenSnackbar, setSnackbarMessage, totalPrice,  totalQuantity) => {
    const newItem = {
      name: product.name,
      productId: product._id,
      image: product.images[0].url,
      price: Number(product.price?.toFixed(2)),
      quantity: Number(qtyPerItem),
      total: Number(product.price?.toFixed(2) * qtyPerItem)
    };

    const existingItem = await cartItems.find(item => item.productId === newItem.productId);
    let updatedCartItems;
    let updatedCartPrice;
    let updatedCartQuantity;
    
    if (existingItem) {
      updatedCartItems = cartItems.map(item =>
        item.productId === newItem.productId
          ? { ...item, quantity: item.quantity + newItem.quantity, total: item.total + newItem.total }
          : item
      );
      updatedCartPrice = await updatedCartItems.reduce((acc, item) => acc + item.total, 0);
      updatedCartQuantity = await updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);
      dispatch(setCartItems(updatedCartItems));
      dispatch(setTotalPrice(updatedCartPrice));
      dispatch(setTotalQuantity(updatedCartQuantity));
      setOpenSnackbar(true);
      setSnackbarMessage(`Increased ${newItem.name} quantity`);
    } else {
      updatedCartItems = [...cartItems, newItem];
      updatedCartPrice = totalPrice + newItem.total;
      updatedCartQuantity = totalQuantity + qtyPerItem;
      dispatch(setCartItems(updatedCartItems));
      dispatch(setTotalPrice(updatedCartPrice));
      dispatch(setTotalQuantity(updatedCartQuantity));
      setOpenSnackbar(true);
      setSnackbarMessage(`${newItem.name} added to cart`);
    }

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('totalPrice', JSON.stringify(updatedCartPrice));
    localStorage.setItem('totalQuantity', JSON.stringify(updatedCartQuantity));
    dispatch(setPricePerItem(0));
    dispatch(setQtyPerItem(0));

    return Promise.resolve();
  
  };