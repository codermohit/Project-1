import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateCart from './UpdateCart';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex items-center justify-between py-3 ">
      <p className="text-stone-700">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-4">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateCart pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
