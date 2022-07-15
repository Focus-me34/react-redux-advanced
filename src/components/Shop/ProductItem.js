import { useDispatch } from 'react-redux';
import { changeNumberOfItem } from '../../store/reducers/itemSlice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const dispatch = useDispatch()

  const { title, price, description } = props;

  const addItemHandler = (e) => {
    e.preventDefault();
    dispatch(changeNumberOfItem({ title: title, type: "add" }))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
