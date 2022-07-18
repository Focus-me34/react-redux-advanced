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
    { id: 1, title: 'React App', quantity: 1, total: 100, price: 100 },
    { id: 2, title: 'Rails App', quantity: 1, total: 250, price: 250 },
  ],
  changed: false
}

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    replaceCart: (state, action) => { state.selectedItems = action.payload.cartItems },
    changeNumberOfItem: (state, action) => {
      const { title, type, item } = action.payload
      // ! WE TRY TO FIND THE ITEM THE USER CLICKED ON INSIDE THE SELECTED ITEMS ARRAY
      const product = state.availableItems.find(item => item.title === title)
      let itemToAdd = state.selectedItems.find(item => item.title === title)

      // ! WE CREATE A NEW SELECTED ITEM IF WE DON'T FIND THE ITEM IN THE ARRAY.
      // ! WE ALSO USE THE SPREAD OPERATOR TO MAKE SURE WE KEEP THE PREVIOUS ITEMS
      if (!itemToAdd) {
        state.selectedItems.push({
          // ? WE INITIALISE THE ID AT 0 IF 0 ITEM WAS ADDED BEFORE.
          // ? OTHERWISE LAST ITEM ID + 1
          id: state.selectedItems.length !== 0 ? state.selectedItems[state.selectedItems.length - 1].id + 1 : 0,
          title: item.title,
          quantity: 0,
          total: 0,
          price: item.price
        })

        // ! WE SELECT THE LAST ITEM, FRESHLY CREATED FROM THE SELECTED ITEM ARRAY
        itemToAdd = state.selectedItems[state.selectedItems.length - 1]
      }
      // ! FINALLY WE UPDATE THE FRESHLY CREATED ITEM (QUANTITY + TOTAL)
      if (type === "add") {
        itemToAdd.quantity++
        itemToAdd.total += product.price
        state.changed = true;
      } else if (type === "remove") {
        if (itemToAdd.quantity === 1) {
          state.selectedItems = state.selectedItems.filter(item => item !== itemToAdd)
        } else {
          itemToAdd.quantity--
          itemToAdd.total -= product.price
        }
        state.changed = true;
      }
    },
  }
})


export const { changeNumberOfItem, replaceCart } = itemSlice.actions
export default itemSlice.reducer

// { id: 1, title: 'React App', quantity: 6, total: 600, price: 100 },
