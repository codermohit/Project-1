import { useSelector } from 'react-redux';
import { getUsername } from './userSlice';

function Username() {
  const username = useSelector(getUsername);
  if (!username) return;
  return <p className="hidden tracking-wide sm:block">{username}</p>;
}

export default Username;
