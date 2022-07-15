import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import itemReducer from "./reducers/itemSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    item: itemReducer
   }
})

export default store
