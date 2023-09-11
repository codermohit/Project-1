// Test ID: IIDSAT

import { useLoaderData } from 'react-router';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';

// const order = {
//   id: 'ABCDEF',
//   customer: 'Jonas',
//   phone: '123456789',
//   address: 'Arroios, Lisbon , Portugal',
//   priority: true,
//   estimatedDelivery: '2027-04-25T10:00:00',
//   cart: [
//     {
//       pizzaId: 7,
//       name: 'Napoli',
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: 'Diavola',
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: 'Romana',
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: '-9.000,38.000',
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const data = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = data;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div className="mb-10 flex justify-between">
        <h2 className="text-[1.3rem] font-semibold tracking-wide">
          Order #{id} status
        </h2>

        <div className="flex items-center justify-center gap-4 text-sm uppercase">
          {priority && (
            <span className="rounded-full bg-red-600 px-2 py-1 font-semibold tracking-wider text-stone-200">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600 px-2 py-1 font-semibold tracking-wider text-stone-200">
            {status} order
          </span>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between rounded-md bg-stone-200 px-4 py-4">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm text-stone-600">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="bottom-b divide-y divide-stone-200 border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
            isLoadingIngredients={fetcher.state === 'loading'}
          />
        ))}
      </ul>

      <div className="mt-6 rounded-md bg-stone-200 px-4 py-4">
        <p className="text-sm ">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="text-sm">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export default Order;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const { orderId } = params;
  const data = await getOrder(orderId);

  return data;
}
