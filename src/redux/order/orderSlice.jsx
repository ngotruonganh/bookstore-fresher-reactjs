import { createSlice } from '@reduxjs/toolkit';

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
            if(isExistIndex >  -1){
                cart[isExistIndex].quantity = cart[isExistIndex].quantity + item.quantity;
            }
            else {
                cart.push({_id: item._id, quantity: item.quantity, detail: item.detail});
            }
            state.cart = cart;
        }
    },
    extraReducers: (builder) => {
    }
});

export const {addToCart } = orderSlice.actions;

export default orderSlice.reducer;
