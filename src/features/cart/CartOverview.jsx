import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPizzaQuantity, getTotalPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const cartTotalPrice = useSelector(getTotalPrice);
  const cartTotalPizzas = useSelector(getTotalPizzaQuantity);

  return (
    <div className=" flex justify-between bg-stone-800 px-6 py-5">
      <p className="flex gap-4 text-stone-50">
        <span>{cartTotalPizzas} pizzas</span>
        <span>{formatCurrency(cartTotalPrice)}</span>
      </p>
      <Link to="/cart" className="text-stone-50">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
