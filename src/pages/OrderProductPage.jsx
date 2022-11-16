import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrderStore from '../hooks/useOrderStore';

export default function OrderProductPage() {
  const { orderId } = useParams();
  const orderStore = useOrderStore();

  useEffect(() => {
    orderStore.find(orderId);
  }, []);

  return (
    <div>
      {orderId}
    </div>
  );
}
