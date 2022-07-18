import { showNotification } from "./cartSlice";
import { replaceCart } from "./itemSlice";

export const sendCartData = (items) => {
  return async (dispatch) => {
    dispatch(showNotification({ status: "pending", title: "Sending...", message: "Sending cart data!" }))

    // ! WE CREATE THE ASYNC FUNCTION IN CHARGE OF SENDING THE DATA TO THE BACKEND SERVER
    const sendRequest = async () => {
      const res = await fetch("https://react-redux-advanced-e4389-default-rtdb.europe-west1.firebasedatabase.app/cartItems.json", {
        method: "PUT",
        body: JSON.stringify(items),
        headers: { "Content-Type": "application/json" }
      });

      // ! WE THROW A NEW ERROR IF THE VALUE OF THE OK PROPERTY IS "FALSE"
      if (!res.ok) {
        throw new Error("An error occured: Failed to update the cart")
      }
    }

    // ! WE HANDLE ERRORS USING TRY CATCH
    try {
      // ? WE AWAIT THE FUNCTION CALL. IF SUCCESSFULL WE DISPATCH ONE "SUCCESS" ACTION
      await sendRequest();
      dispatch(showNotification({ status: "success", title: "Success", message: "Sent cart datas successfuly!" }))
    } catch (error) {
      // ? OTHERWISE WE DISPATCH AN "ERROR" ACTION
      dispatch(showNotification({ status: "error", title: "Error", message: "Error sending the cart data" }))
    }
  }
}

export const getCartData = () => {
  return async (dispatch) => {
    dispatch(showNotification({ status: "pending", title: "Fetching...", message: "Sending cart data!" }))

    const sendRequest = async () => {
      const res = await fetch("https://react-redux-advanced-e4389-default-rtdb.europe-west1.firebasedatabase.app/cartItems.json")

      // ! WE THROW A NEW ERROR IF THE VALUE OF THE OK PROPERTY IS "FALSE"
      if (!res.ok) {
        throw new Error("An error occured: Failed to update the cart")
      }

      const data = await res.json()
      return data
    }

    // ! WE HANDLE ERRORS USING TRY CATCH
    try {
      // ? WE AWAIT THE FUNCTION CALL. IF SUCCESSFULL WE DISPATCH ONE "SUCCESS" ACTION
      const cartData = await sendRequest();
      dispatch(replaceCart({ cartItems: cartData || [] }))
      dispatch(showNotification({ status: "success", title: "Success", message: "Fetched cart data successfully!" }))
    } catch (error) {
      // ? OTHERWISE WE DISPATCH AN "ERROR" ACTION
      dispatch(showNotification({ status: "error", title: "Error", message: "Error fetching the cart data" }))
    }
  }
}
