import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    searchText: '',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchAction: (state, action) => {
            state.searchText = action.payload;
        }
    },
});

export const {
    searchAction
} = searchSlice.actions;

export default searchSlice.reducer;
