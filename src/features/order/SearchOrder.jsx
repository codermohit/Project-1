import { useState } from 'react';
import { useNavigate } from 'react-router';

function SearchOrder() {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!orderId) return;
    navigate(`/order/${orderId}`);
    setOrderId('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        type="text"
        className="h-8 w-40 rounded-lg px-5 py-3 text-center text-sm text-stone-700 sm:w-52"
        placeholder="Search Order # "
      />
    </form>
  );
}

export default SearchOrder;
