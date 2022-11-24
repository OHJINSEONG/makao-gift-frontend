import { useParams } from 'react-router-dom';
import OrderInformation from '../conponents/OrderInformation';

export default function OrderInformationPage() {
  const { orderId } = useParams();

  return (
    <OrderInformation orderId={orderId} />
  );
}
