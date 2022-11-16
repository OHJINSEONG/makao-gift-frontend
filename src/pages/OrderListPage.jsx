import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useOrderStore from '../hooks/useOrderStore';

export default function OrderListPage() {
  const orderStore = useOrderStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    console.log(accessToken);

    if (accessToken) {
      orderStore.fetchOrders(1, accessToken);
    }
  }, []);

  return (
    <div>
      {orderStore.orders.length
        ? (
          <div>
            <h2>내가 주문한 내역입니다.</h2>
            <ul>
              {orderStore.orders.map((order) => (
                <li key={order.id}>
                  <Link to={`${order.id}`}>
                    {order.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
        : (<h2>내가 주문한 내역이 없습니다.</h2>) }
    </div>
  );
}
