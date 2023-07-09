import {combineReducers, configureStore} from '@reduxjs/toolkit';
import accountReducer from '../redux/account/accountSlice';
import orderReducer from '../redux/order/orderSlice';
import searchReducer from '../redux/search/searchSlice';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // account, search will not be persisted
    blacklist: ['account', 'search']
}

const rootReducer = combineReducers({
    account: accountReducer,
    order: orderReducer,
    search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    }
)

let persistor = persistStore(store);

export {store, persistor};
