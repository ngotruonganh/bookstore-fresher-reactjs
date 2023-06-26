import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./account/accountSlice.jsx";

export const store = configureStore({
  reducer: {
    account: accountReducer
  },
});
