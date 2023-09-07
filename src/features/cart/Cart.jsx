import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart, getCart } from './cartSlice';
import { getUsername } from '../user/userSlice';
import CartItem from './CartItem';
import Button from '../../ui/Button';
import EmptyCart from './EmptyCart';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUsername);
  const dispatch = useDispatch();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="ml-4 ">
      <Link to="/menu" className="text-sm text-indigo-700">
        &larr; Back to menu
      </Link>

      <h2 className="my-4 text-[1.15rem] font-bold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className="mt-6 flex gap-6">
        <Button to="/order/new">Order Pizzas</Button>
        <button
          onClick={() => dispatch(clearCart())}
          className="sm:text-md rounded-full border-2 border-stone-500 px-3 py-2 text-sm font-semibold uppercase  text-stone-500 sm:px-5 sm:py-3"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
