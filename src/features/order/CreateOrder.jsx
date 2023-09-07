import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import store from '../../store';
import { clearCart, getCart, getTotalPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import EmptyCart from '../cart/EmptyCart';
import { getUsername } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const username = useSelector(getUsername);

  const formError = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const totalPriceWithPriority = totalPrice + priorityPrice;

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-lg font-semibold">Ready to order?</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={username}
            type="text"
            className="input grow"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formError?.phone ? (
              <p className="absolute ml-3 rounded-md bg-red-200 px-1 py-1 text-sm text-stone-600">
                {formError?.phone}
              </p>
            ) : (
              ''
            )}
          </div>
        </div>

        <div
          className={`relative ${
            formError?.phone ? 'mt-10' : ''
          } mb-5 flex flex-col gap-2 sm:flex-row sm:items-center`}
        >
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              className="input w-full"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-indigo-400 focus:outline-none focus:ring focus:ring-indigo-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          {/*To provide value to the request */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>

        <div>
          <Button>
            {isSubmitting
              ? 'Placing Order...'
              : `Order now for ${
                  withPriority
                    ? formatCurrency(totalPriceWithPriority)
                    : formatCurrency(totalPrice)
                }`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  const error = {};
  if (!isValidPhone(order.phone))
    error.phone = 'Please provide correct phone number';
  if (Object.keys(error).length > 0) return error;

  //create order if no errors
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
