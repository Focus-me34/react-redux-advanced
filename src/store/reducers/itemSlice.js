import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availableItems: [
    {
      id: 1,
      title: 'React App',
      price: 100,
      description: 'We create a reactive, fast and beautiful front end application'
    },
    {
      id: 2,
      title: 'Rails App',
      price: 250,
      description: 'We build a robust backend server for your front end application'
    }
  ],
  selectedItems: [
    { id: 1, title: 'React App', quantity: 6, total: 600, price: 100 },
    { id: 2, title: 'Rails App', quantity: 2, total: 500, price: 250 }
  ],
}

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    changeNumberOfItem: (state, action) => {
      const { title, type } = action.payload
      const product = state.availableItems.find(item => item.title === title)
      const itemToAdd = state.selectedItems.find(item => item.title === title)
      if (type === "add") {
        itemToAdd.quantity++
        itemToAdd.total += product.price
      } else if (type === "remove") {
        itemToAdd.quantity--
        itemToAdd.total -= product.price
      }
    },
  }
})

export const { changeNumberOfItem } = itemSlice.actions
export default itemSlice.reducer

// { id: 1, title: 'React App', quantity: 6, total: 600, price: 100 },
