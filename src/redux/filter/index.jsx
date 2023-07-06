import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterCategories: []
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        getAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
    },
    extraReducers: (builder) => {
    }
});

export const { loginAction, getAccountAction } = filterSlice.actions;

export default filterSlice.reducer;
