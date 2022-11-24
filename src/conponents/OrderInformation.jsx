import { useEffect } from 'react';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  font-size: .5em;

  h2{
    font-size: 1.4em;
    width: 400px;
    margin-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    border-bottom: solid 1px #999999;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`;

const Menu = styled.div`
  width: 400px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #999999;
`;

const Gray = styled.p`
  color: #999999
`;

export default function OrderInformation({ orderId }) {
  const orderStore = useOrderStore();

  useEffect(() => {
    orderStore.find(orderId);
  }, []);

  return (
    <Container>
      <Image src={orderStore.order.image} />
      <Gray>
        제조사:
        {' '}
        {orderStore.order.manufacturer}
      </Gray>
      <h2>{orderStore.order.title}</h2>
      <Menu>
        <p>
          구매수량 :
        </p>
        <Gray>
          {orderStore.order.amount}
          개
        </Gray>
      </Menu>
      <Menu>
        <p>
          총 상품금액:
        </p>
        <Gray>
          {orderStore.order.totalPrice}
          원
        </Gray>
      </Menu>
      <Menu>
        <p>
          구매일 :
        </p>
        <Gray>
          {orderStore.order.dateOfPurchase}
        </Gray>
      </Menu>
      <Menu>
        <p>
          받는 분 :
        </p>
        <Gray>
          {orderStore.order.receiver}
        </Gray>
      </Menu>
      <Menu>
        <p>
          받는 분 주소 :
        </p>
        <Gray>
          {orderStore.order.address}
        </Gray>
      </Menu>
      <Menu>
        <p>
          받는 분께 보내는 메세지 :
        </p>
        <Gray>
          {orderStore.order.message}
        </Gray>
      </Menu>
    </Container>
  );
}
