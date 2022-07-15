import classes from './CartButton.module.css';
import { toggleCart } from '../../store/reducers/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(state => state.item.selectedItems)

  let totalItems = 0
  for (const item of selectedItems) {
    totalItems += item.quantity
  }

  const onToggleShowCartHandler = (e) => {
    e.preventDefault();
    dispatch(toggleCart());
  }

  return (
    <button className={classes.button} onClick={onToggleShowCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
