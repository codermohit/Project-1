import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import SpinningLoader from './SpinningLoader';
import { useSelector } from 'react-redux';
import { getCart } from '../features/cart/cartSlice';
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const cart = useSelector(getCart);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <SpinningLoader />}
      <Header />
      <div className="overflow-scroll">
        <div className="mx-auto max-w-xl sm:max-w-3xl">
          <Outlet />
        </div>
      </div>
      {cart.length > 0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
