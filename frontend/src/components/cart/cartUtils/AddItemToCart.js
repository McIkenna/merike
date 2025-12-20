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


// export const AddItemToCart = async(product, qtyPerItem, cartItems, dispatch, setOpenSnackbar, setSnackbarMessage, totalPrice,  totalQuantity) => {
    
//     const newItem = {
//       name: product.name,
//       productId: product._id,
//       image: product.images[0].url,
//       price: Number(product.price?.toFixed(2)),
//       quantity: Number(qtyPerItem),
//       total: Number(product.price?.toFixed(2) * qtyPerItem)
//     };

//     const existingItem = await cartItems.find(item => item.productId === newItem.productId);
//     let shouldUpdate = false;
//     let updatedCartItems;
//     let updatedCartPrice;
//     let updatedCartQuantity;
    
//     if (existingItem) {
      
//       updatedCartItems = cartItems.map(item => {
//         if(item.productId === newItem.productId){
//           const updatedQuantity = item.quantity + newItem.quantity
//           shouldUpdate = updatedQuantity <= product.stock;


//           if(shouldUpdate){
//             return { ...item, 
//             quantity: updatedQuantity, 
//             total: item.total + newItem.total 
//           }
//         }
//         }
          
//         return item
        

//       });
//       if(shouldUpdate){
//       updatedCartPrice = await updatedCartItems.reduce((acc, item) => acc + item.total, 0);
//       updatedCartQuantity = await updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);
//       dispatch(setCartItems(updatedCartItems));
//       dispatch(setTotalPrice(updatedCartPrice));
//       dispatch(setTotalQuantity(updatedCartQuantity));
//       setOpenSnackbar(true);
//       setSnackbarMessage(`Increased ${newItem.name} quantity`)
//       }else{
//         setOpenSnackbar(true);
//         setSnackbarMessage(`Out of Stock for ${newItem.name}`)

//       }
    
//     } else {
//       updatedCartQuantity = totalQuantity + qtyPerItem;
//       shouldUpdate = updatedCartQuantity <= product.stock;
//       if(shouldUpdate){
//           updatedCartItems = [...cartItems, newItem];
//           updatedCartPrice = totalPrice + newItem.total;
//           dispatch(setCartItems(updatedCartItems));
//           dispatch(setTotalPrice(updatedCartPrice));
//           dispatch(setTotalQuantity(updatedCartQuantity));
//           setOpenSnackbar(true);
//           setSnackbarMessage(`${newItem.name} added to cart`);
//       }else{
//         setOpenSnackbar(true);
//         setSnackbarMessage(`Out of Stock for ${newItem.name}`)
//       }
//     }
//     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
//     localStorage.setItem('totalPrice', JSON.stringify(updatedCartPrice));
//     localStorage.setItem('totalQuantity', JSON.stringify(updatedCartQuantity));
//     dispatch(setPricePerItem(0));
//     dispatch(setQtyPerItem(0));

//     return Promise.resolve();
  
//   };