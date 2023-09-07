import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div>
      <Link to="/menu" className="text-sm text-indigo-700">
        &larr; Back to menu
      </Link>

      <p className="ml-7 mt-10 rounded-md bg-stone-200 px-5 py-3">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
