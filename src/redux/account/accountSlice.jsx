import {createSlice} from '@reduxjs/toolkit';

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
            state.user = action.payload;
        },
        getLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutAction: (state, action) => {
            state.isAuthenticated = false;
            state.user = {
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            }
        }
    },
});

export const {
    loginAction,
    getLoginAction,
    logoutAction,
} = accountSlice.actions;

export default accountSlice.reducer;
