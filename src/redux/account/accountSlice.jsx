import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {
      email: "",
      phone: "",
      fullName: "",
      role: "",
      avatar: "",
      id: ""
    }
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        getAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
    },
    extraReducers: (builder) => {
    }
});

export const { loginAction, getAccountAction } = accountSlice.actions;

export default accountSlice.reducer;
