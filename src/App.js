import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useEffect } from 'react';
import { sendCartData, getCartData } from './store/reducers/itemSlice-actions';
import { useSelector, useDispatch } from 'react-redux';

let isInitialPageLoad = true

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const items = useSelector(state => state.item);

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialPageLoad) {
      isInitialPageLoad = false
      // dispatch(getCartData());
      return
    }

    // ! IF THE ITEM ARRAY IN CART CHANGED, WE POST THE DATA
    // ! IT'S A WAY TO AVOID POSTING THE CART WHEN THE APPLICATION RELOAD
    if (items.changed) {
      dispatch(sendCartData(items.selectedItems));
    }

  }, [items.selectedItems, items.changed, dispatch])

  return (
    <Layout>
      {cart.notification && <Notification
        status={cart.notification.status}
        title={cart.notification.title}
        message={cart.notification.message} />}

      {cart.showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
