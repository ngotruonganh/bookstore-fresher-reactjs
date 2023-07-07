import {createSlice} from '@reduxjs/toolkit';
import {message} from "antd";

const initialState = {
    cart: [],
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const cart = state.cart;
            const item = action.payload;
            const isExistIndex = cart.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                if (cart[isExistIndex].quantity >= cart[isExistIndex].detail.quantity) {
                    cart[isExistIndex].quantity = cart[isExistIndex].detail.quantity;
                    message.error(`You already have ${cart[isExistIndex].quantity} quantity in cart. 
                    Unable to add selected quantity to cart as it would exceed your purchase limit.`);
                } else {
                    cart[isExistIndex].quantity = cart[isExistIndex].quantity + item.quantity;
                    message.success("Item has been added to your shopping cart");
                }
            } else {
                cart.push({_id: item._id, quantity: item.quantity, detail: item.detail});
                message.success("Item has been added to your shopping cart");
            }
            state.cart = cart;
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter(c => c._id !== action.payload._id);
        },
        updateQuantity: (state, action) => {
            const cart = state.cart;
            const item = action.payload;
            const isExistIndex = cart.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                cart[isExistIndex].quantity = item.quantity;
            }
            state.cart = cart;
        },
        emptyCart: (state, action) => {
            state.cart = [];
        },
    },
    extraReducers: (builder) => {
    }
});

export const {
    addToCart,
    deleteItem,
    updateQuantity,
    emptyCart,
} = orderSlice.actions;

export default orderSlice.reducer;
