import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: {},
    categories: {},
    selectedCategory: '',
    priceFilter: [0, 500],
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
        }
    },
})

export default reducers