import { useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const items = useSelector(state => state.item.availableItems)

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {items.map(product =>
          <ProductItem
            title={product.title}
            price={product.price}
            description={product.description}
            key={product.id}
          />
        )}
      </ul>
    </section>
  );
};

export default Products;
