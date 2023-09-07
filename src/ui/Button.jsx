import { useNavigate } from 'react-router';

function Button({ children, onClick, to }) {
  const navigate = useNavigate();
  const className =
    'sm:text-md uppercase rounded-full bg-indigo-500 px-3 py-2 text-sm font-semibold text-stone-50 sm:px-5 sm:py-2';

  if (to)
    return (
      <button onClick={() => navigate(`${to}`)} className={className}>
        {children}
      </button>
    );

  if (onClick)
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );

  return <button className={className}>{children}</button>;
}

export default Button;
