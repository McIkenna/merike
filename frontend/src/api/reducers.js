import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: {},
    categories: {},
    selectedCategory: '',
    priceFilter: [0, 500],
    pricePerItem: 0,
    qtyPerItem: 0,
    totalPrice: localStorage.getItem('totalPrice') ? JSON.parse(localStorage.getItem('totalPrice')) : 0,
    totalQuantity: localStorage.getItem('totalQuantity') ? JSON.parse(localStorage.getItem('totalQuantity')) : 0,
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
}

const reducers = createSlice({
    name: 'stateStore',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            return {
               ...state,
                products: action.payload,
            }
        },
        setCategories: (state, action) => {
            return {
               ...state,
                categories: action.payload,
            }
        },
        setSelectedCategory: (state, action) => {
            return {
               ...state,
                selectedCategory: action.payload,
            }
        },
        setPriceFilter: (state, action) => {
            return {
               ...state,
                priceFilter: action.payload,
            }
        },
        setPricePerItem: (state, action) => {
            return {
               ...state,
                pricePerItem: action.payload,
            }
        },
        setQtyPerItem: (state, action) => {
            return {
               ...state,
                qtyPerItem: action.payload,
            }
        },
        setTotalPrice: (state, action) => {
            return {
               ...state,
                totalPrice: action.payload,
            }
        },
        setTotalQuantity: (state, action) => {
            return {
               ...state,
                totalQuantity: action.payload,
            }
        },
        setCartItems: (state, action) => {
            return {
               ...state,
                cartItems: action.payload,
            }
            
        }

        
    }
    
})

export default reducers