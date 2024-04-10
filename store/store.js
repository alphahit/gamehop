import { configureStore } from '@reduxjs/toolkit';
import MyProductReducer from './slices/MyProductSlice';
import {freeGames, paidGames, sliderData} from '../model/data';
import MyCartReducer from './slices/MyCartSlice';
export const store = configureStore({
  reducer: {
    product: MyProductReducer,
    cart : MyCartReducer
  },
});