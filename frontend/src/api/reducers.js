import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: {},
    categories: {},
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
        }
    },
})

export default reducers