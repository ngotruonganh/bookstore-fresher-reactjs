import {createSlice} from '@reduxjs/toolkit';
import {message} from "antd";

const initialState = {
    cart: [],
    cartBuyNow: [],
    tempCart: [],
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
                if (cart[isExistIndex].quantity + item.quantity > cart[isExistIndex].detail.quantity) {
                    message.error(`You already have ${cart[isExistIndex].quantity} quantity in cart. 
                    Unable to add selected quantity to cart as it would exceed your purchase limit.
                    you can add max is ${cart[isExistIndex].detail.quantity - cart[isExistIndex].quantity}`);
                } else {
                    cart[isExistIndex].quantity = cart[isExistIndex].quantity + item.quantity;
                    message.success("Item has been added to your shopping cart");
                }
            }
            else {
                cart.push({_id: item._id, quantity: item.quantity, detail: item.detail});
                message.success("Item has been added to your shopping cart");
            }
            state.cart = cart;
        },
        addToTempCart: (state, action) => {
            const tempCart = state.tempCart;
            const item = action.payload;
            tempCart[0] = ({_id: item._id, quantity: item.quantity, detail: item.detail});
        },
        addTempCartToCart: (state, action) => {
            state.cart = state.tempCart;
        },
        addTempCartToBuyNow: (state, action) => {
            state.cartBuyNow = state.tempCart;
        },
        emptyCart: (state, action) => {
            state.cart = [];
        },
        emptyTempCart: (state , action) => {
            state.tempCart = [];
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
        deleteItem: (state, action) => {
            state.cart = state.cart.filter(c => c._id !== action.payload._id);
        },
    },
});

export const {
    addToCart,
    addToTempCart,
    addTempCartToCart,
    addTempCartToBuyNow,
    emptyCart,
    emptyTempCart,
    updateQuantity,
    deleteItem,
} = orderSlice.actions;

export default orderSlice.reducer;
