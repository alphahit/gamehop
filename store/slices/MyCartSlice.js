import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const MyCartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    clearCart: (state, action) => {
      return (state = initialState);
    },
    addMyProductToCart: (state, action) => {
      let myIndex = -1;

      state.map((item, index) => {
        if (item.id === action.payload.id) {
          myIndex = index;
        }
      });

      if (myIndex === -1) {
        state.push({...action.payload, qty: action.payload.qty + 1});
      } else {
        state[myIndex].qty += 1;
      }
    },
    removeMyProductFromCart: (state, action) => {
      let myIndex = -1;
      let filter = false;

      state.map((item, index) => {
        if (item.id === action.payload.id) {
          myIndex = index;
        }
      });

      if (myIndex === -1) {
      } else if (state[myIndex].qty === 1) {
        console.log(
          'Cart State:================================================================>',
          state,
        );
        console.log('<========FIlter Condition ========>');
        return (state = state.filter(item => item.id !== action.payload.id));
      } else {
        state[myIndex].qty -= 1;
      }
    },
  },
});

export const {addMyProductToCart, removeMyProductFromCart, clearCart} =
  MyCartSlice.actions;

const MyCartReducer = MyCartSlice.reducer;
export default MyCartReducer;
