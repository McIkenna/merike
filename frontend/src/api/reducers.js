import { createSlice } from "@reduxjs/toolkit";
import { setProductRecentlyBought } from "./actions";
const initialState = {
    products: {},
    categories: {},
    selectedCategory: 'all',
    priceFilter: [0, 500],
    pricePerItem: 0,
    qtyPerItem: 0,
    totalPrice: localStorage.getItem('totalPrice') ? JSON.parse(localStorage.getItem('totalPrice')) : 0,
    totalQuantity: localStorage.getItem('totalQuantity') ? JSON.parse(localStorage.getItem('totalQuantity')) : 0,
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    allOrders: [],
    viewedProducts: localStorage.getItem("viewedProducts") ? JSON.parse(localStorage.getItem("viewedProducts")) : [],
    cartInspiredProducts: localStorage.getItem("cartInspiredProducts") ? JSON.parse(localStorage.getItem("cartInspiredProducts")) : [],
    recommendedProducts: localStorage.getItem("recommendedProducts") ? JSON.parse(localStorage.getItem("recommendedProducts")) : [],
    productRecentlyBought: localStorage.getItem("productRecentlyBought") ? JSON.parse(localStorage.getItem("productRecentlyBought")) : [],

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
            
        },
        setAllOrders: (state, action) => {
            return {
               ...state,
                allOrders: action.payload,
            }
        },
        setViewedProducts: (state, action) => {
            return {
               ...state,
                viewedProducts: action.payload,
            }
        },
        setCartInspiredProducts: (state, action) => {
            return {
               ...state,
                cartInspiredProducts: action.payload,
            }
        },
        setRecommendedProducts: (state, action) => {
            return {
               ...state,
                recommendedProducts: action.payload,
            }
        },
        setProductRecentlyBought: (state, action) => {
            return {
               ...state,
                productRecentlyBought: action.payload,
            }
        }

        
    }
    
})

export default reducers