// Import the createSlice API from Redux Toolkit
import {createSlice} from '@reduxjs/toolkit';

// This is the initial state of the slice
const initialState = [];

export const MyProductSlice = createSlice({
  name: 'product', // This is the name of the slice, we will later use this name to access the slice from the store
  initialState: initialState, // This is the initial state of the slice
  reducers: {
    // All the reducers go here
    addMyProducts: (state, action) => {
      // This is the reducer function for the adding all products to the state
      state.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {addMyProducts} = MyProductSlice.actions;

// We export the reducer function so that it can be added to the store
const MyProductReducer = MyProductSlice.reducer;
export default MyProductReducer;
