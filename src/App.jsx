import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Menu from './features/menu/Menu';
import CreateOrder from './features/order/CreateOrder';
import Cart from './features/cart/Cart';
import { loader as menuLoader } from './features/menu/Menu';
import { action as orderAction } from './features/order/CreateOrder';
import { loader as orderLoader } from './features/order/Order';
import { Toaster } from 'react-hot-toast';
import Order from './features/order/Order';
import Error from './ui/Error';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: '/',
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <Menu />,
        path: '/menu',
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        element: <Cart />,
        path: '/cart',
      },
      {
        element: <CreateOrder />,
        path: '/order/new',
        action: orderAction,
      },
      {
        element: <Order />,
        path: '/order/:orderId',
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 1000,
            error: {
              duration: 1000,
            },
            style: {
              fontSize: '10px',
              fontWeight: 'bold',
              maxWidth: '500px',
              padding: '8px 12px',
              backgroundColor: 'white',
              color: 'var(--color-grey-700)',
            },
          },
        }}
      />
    </>
  );
}

export default App;
