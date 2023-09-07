import { useLoaderData } from 'react-router';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menuData = useLoaderData();

  return (
    <ul className="mb-4 divide-y divide-stone-200 px-2">
      {menuData.map((item) => (
        <MenuItem key={item.id} pizza={item} />
      ))}
    </ul>
  );
}

export default Menu;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const data = await getMenu();
  return data;
}
