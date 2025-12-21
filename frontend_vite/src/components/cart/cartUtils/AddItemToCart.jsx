import { setCartItems, setTotalPrice, setTotalQuantity, setPricePerItem, setQtyPerItem } from "../../../api/actions";
import { useState } from "react";

export const AddItemToCart = (
  product,
  qtyPerItem,
  cartItems,
  dispatch,
  setOpenSnackbar,
  setSnackbarMessage,
  setSeverity,
  totalPrice,
  totalQuantity
) => {
  return new Promise((resolve) => {
    const price = Number(product.price);
    const quantityToAdd = Number(qtyPerItem);

    const newItem = {
      name: product.name,
      productId: product._id,
      image: product.images?.[0]?.url || '',
      price,
      quantity: quantityToAdd,
      total: price * quantityToAdd
    };

    const existingItem = cartItems.find(
      item => item.productId === newItem.productId
    );

    let updatedCartItems = [...cartItems];

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + quantityToAdd;

      if (updatedQuantity > product.stock) {
        setOpenSnackbar(true);
        setSnackbarMessage(`Out of Stock for ${newItem.name}`);
        setSeverity('warning')
        return resolve(false); // 👈 no error
      }

      updatedCartItems = cartItems.map(item =>
        item.productId === newItem.productId
          ? {
              ...item,
              quantity: updatedQuantity,
              total: price * updatedQuantity
            }
          : item
      );
    } else {
      if (quantityToAdd > product.stock) {
        setOpenSnackbar(true);
        setSnackbarMessage(`Out of Stock for ${newItem.name}`);
        setSeverity('warning')
        return resolve(false); // 👈 no error
      }

      updatedCartItems.push(newItem);
    }

    const updatedCartPrice = updatedCartItems.reduce(
      (acc, item) => acc + item.total,
      0
    );

    const updatedCartQuantity = updatedCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    dispatch(setCartItems(updatedCartItems));
    dispatch(setTotalPrice(updatedCartPrice));
    dispatch(setTotalQuantity(updatedCartQuantity));
    dispatch(setPricePerItem(0));
    dispatch(setQtyPerItem(0));

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    localStorage.setItem('totalPrice', JSON.stringify(updatedCartPrice));
    localStorage.setItem('totalQuantity', JSON.stringify(updatedCartQuantity));

    setOpenSnackbar(true);
    setSnackbarMessage(
      existingItem
        ? `Increased ${newItem.name} quantity`
        : `${newItem.name} added to cart`
    );
    setSeverity('success')

    resolve(true); // 👈 success
  });
};
