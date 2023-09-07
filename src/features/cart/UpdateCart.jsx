import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseItemQuantity,
  getCurrentQuantity,
  increaseItemQuantity,
} from './cartSlice';

function UpdateCart({ pizzaId }) {
  const dispatch = useDispatch();
  const pizzaQuantity = useSelector(getCurrentQuantity(pizzaId));

  return (
    <div className=" mr-4 flex items-center gap-2">
      <button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        className="rounded-md border-2 bg-indigo-500 px-2 font-semibold text-indigo-100 hover:bg-indigo-300 hover:font-bold hover:text-indigo-600 hover:outline-2 hover:outline-offset-2 hover:outline-indigo-400"
      >
        -
      </button>
      <span className="font-bold text-stone-600">{pizzaQuantity}</span>
      <button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        className="rounded-md border-2 bg-indigo-500 px-2 font-semibold text-indigo-100 hover:bg-indigo-300 hover:font-bold hover:text-indigo-600 hover:outline-2 hover:outline-offset-2 hover:outline-indigo-400"
      >
        +
      </button>
    </div>
  );
}

export default UpdateCart;
