import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            toast.success("Login Successfully!")
        },

        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            toast.success("Logout Successfully!")
        },
    },
});

export default authSlice.reducer
export const {login, logout} = authSlice.actions;