import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useEffect } from 'react';
import { showNotification } from './store/reducers/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

let isInitialPageLoad = true

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const items = useSelector(state => state.item);

  console.log(cart.notification);
  useEffect(() => {
    if (!isInitialPageLoad) {
      POSTnewItem(items).catch(error => dispatch(showNotification({ status: "error", title: "Error", message: "Error sending the cart data" })))
    }
    isInitialPageLoad = false
  }, [items, dispatch])

  const POSTnewItem = async (items) => {
    dispatch(showNotification({ status: "pending", title: "Sending...", message: "Sending cart data!" }))
    const res = await fetch("https://react-redux-advanced-e4389-default-rtdb.europe-west1.firebasedatabase.app/cartItems.json", {
      method: "PUT",
      body: JSON.stringify(items),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      dispatch(showNotification({ status: "error", title: "Error", message: "Error sending the cart data" }))
      throw new Error("An error occured: Failed to update the cart")
    }

    // const data = await res.json();
    dispatch(showNotification({ status: "success", title: "Success", message: "Sent cart datas successfuly!" }))
  }

  return (
    <Layout>
      {cart.notification && <Notification status={cart.notification.status} title={cart.notification.title} message={cart.notification.message} />}
      {cart.showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
