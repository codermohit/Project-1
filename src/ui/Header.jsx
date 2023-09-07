import { Link } from 'react-router-dom';
import Username from '../features/user/Username';
import SearchOrder from '../features/order/SearchOrder';
import { useSelector } from 'react-redux';
import { getUsername } from '../features/user/userSlice';

function Header() {
  const username = useSelector(getUsername);
  return (
    <header className="text-md mb-6 flex items-center justify-between bg-indigo-500 px-8 py-3 font-semibold uppercase text-stone-50 sm:py-6 sm:text-lg">
      <Link to="/" className="tracking-widest">
        Italiano Pizza
      </Link>
      <SearchOrder />
      {username !== '' && <Username />}
    </header>
  );
}

export default Header;
