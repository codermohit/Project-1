import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Menu from './features/menu/Menu';
import CreateOrder from './features/order/CreateOrder';
import Cart from './features/cart/Cart';
import { loader as menuLoader } from './features/menu/Menu';
import { action as orderAction } from './features/order/CreateOrder';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: '/',
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <Menu />,
        path: '/menu',
        loader: menuLoader,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
