import { useSelector } from 'react-redux';
import { getUsername } from '../features/user/userSlice';
import CreateUser from '../features/user/CreateUser';

function Home() {
  const username = useSelector(getUsername);
  return (
    <div className="my-10 md:my-12 ">
      <h1 className="text-center text-xl font-semibold capitalize text-stone-600">
        The best pizza.
        <br />
        <span className="text-indigo-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <div className="mt-8 text-center">
        {username === '' && <CreateUser />}
      </div>
    </div>
  );
}

export default Home;
