import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

export default function OrderProductPage() {
  const { orderId } = useParams();
  const orderStore = useOrderStore();

  useEffect(() => {
    orderStore.find(orderId);
  }, []);

  return (
    <div>
      <Image src={require('../images/food.jpg')} />
      <p>
        제조사 :
        {' '}
        {orderStore.order.manufacturer}
      </p>
      <p>{orderStore.order.title}</p>
      <p>
        구매수량 :
        {' '}
        {orderStore.order.amount}
      </p>
      <p>
        총 상품금액:
        {' '}
        {orderStore.order.totalPrice}
      </p>
      <p>
        구매일 :
        {' '}
        {orderStore.order.dateOfPurchase}
      </p>
      <p>
        받는 분 :
        {' '}
        {orderStore.order.receiver}
      </p>
      <p>
        받는 분 주소 :
        {' '}
        {orderStore.order.address}
      </p>
      <p>
        받는 분께 보내는 메세지 :
        {' '}
        {orderStore.order.message}
      </p>
    </div>
  );
}
