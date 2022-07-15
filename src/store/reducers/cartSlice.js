import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => { state.showCart === false ? state.showCart = true : state.showCart = false },
  }
})

export const { toggleCart } = cartSlice.actions
export default cartSlice.reducer
