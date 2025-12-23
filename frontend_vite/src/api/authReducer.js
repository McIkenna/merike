import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stateUser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    };

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setStateUser: (state, action) => {
            return {
                ...state,
                stateUser: action.payload,
            };
        },
        setToken: (state, action) => {
            return {
                ...state,
                token: action.payload,
            };
        },
        logoutStateUser: (state) => {
            return {
                ...state,
                stateUser: null,
                token: null,
            };
        },
        
    }
});

export default authReducer;