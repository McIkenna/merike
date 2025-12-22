import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    };

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                user: action.payload,
            };
        },
        setToken: (state, action) => {
            return {
                ...state,
                token: action.payload,
            };
        },
        logout: (state) => {
            return {
                ...state,
                user: null,
                token: null,
            };
        },
        
    }
});

export default authReducer;