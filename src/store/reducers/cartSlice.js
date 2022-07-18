import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCart: false, notification: null }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => { state.showCart = !state.showCart },
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      }
    }
  }
})

export const { toggleCart, showNotification } = cartSlice.actions
export default cartSlice.reducer


// toggleCart: (state) => { state.showCart === false ? state.showCart = true : state.showCart = false },
