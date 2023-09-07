import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantity } from '../cart/cartSlice';
// import { TbHttpDelete } from 'react-icons/tb';
import UpdateCart from '../cart/UpdateCart';
import DeleteItem from '../cart/DeleteItem';
import Button from '../../ui/Button';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantity(id));
  const isInCart = currentQuantity > 0;

  //add pizza to the cart
  function handleSubmit() {
    //creating the pizza object
    const newPizza = {
      name,
      pizzaId: id,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    //dispatch action
    dispatch(addItem(newPizza));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 sm:h-32 ${soldOut ? 'opacity-60 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />

      <div className="flex grow flex-col  pt-0.5">
        <p className={`font-medium ${soldOut ? 'text-stone-500' : ''}`}>
          {name}
        </p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 sm:pt-0 ">
          {!soldOut ? (
            <div>
              <p>{formatCurrency(unitPrice)}</p>
            </div>
          ) : (
            <p className="text-stone-500">Sold out</p>
          )}

          {isInCart && (
            <div className=" ml-4 flex items-center justify-between gap-4 sm:ml-0">
              <UpdateCart pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!isInCart && !soldOut && (
            <Button onClick={handleSubmit}>Add To Cart</Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
