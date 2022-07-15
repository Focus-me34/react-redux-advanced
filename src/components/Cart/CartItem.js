import classes from './CartItem.module.css';
import { changeNumberOfItem } from '../../store/reducers/itemSlice';
import {useDispatch } from 'react-redux';

const CartItem = (props) => {
  const dispatch = useDispatch()
  const { title, quantity, total, price } = props;

  const addItemHandler = (e) => {
    e.preventDefault();
    dispatch(changeNumberOfItem({ title: title, type: "add" }))
  }

  const removeItemHandler = (e) => {
    e.preventDefault();
    dispatch(changeNumberOfItem({ title: title, type: "remove" }))
  }

  return (
    <>
      {quantity > 0 && <li className={classes.item}>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>
            ${total.toFixed(2)}{' '}
            <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
          </div>
        </header>
        <div className={classes.details}>
          <div className={classes.quantity}>
            x <span>{quantity}</span>
          </div>
          <div className={classes.actions}>
            <button onClick={removeItemHandler}>-</button>
            <button onClick={addItemHandler}>+</button>
          </div>
        </div>
      </li >}
    </>
  );
};

export default CartItem;
