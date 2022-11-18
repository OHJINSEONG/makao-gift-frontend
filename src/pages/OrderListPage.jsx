import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useOrderStore from '../hooks/useOrderStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: .5em;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;

  h1 {
    align-self: flex-start;
  }
`;

const OrderList = styled.ul`
  display: grid;
  grid: repeat(2,180px)/repeat(4,110px);
  justify-content: center;
  align-items: center;

  li{
    width: 100%;
    height: 100%;
  }

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

export default function OrderListPage() {
  const orderStore = useOrderStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    console.log(orderStore.orders);

    if (accessToken) {
      orderStore.fetchOrders(1, accessToken);
    }
  }, []);

  return (
    <Container>
      {orderStore.orders.length
        ? (
          <Menu>
            <h2>내가 주문한 내역입니다.</h2>
            <OrderList>
              {orderStore.orders.map((order) => (
                <li key={order.id}>
                  <Link className="order" to={`${order.id}`}>
                    <Image src={require('../images/food.jpg')} />
                    <p>
                      제조사 :
                      {' '}
                      {order.manufacturer}
                    </p>
                    <p>{order.title}</p>
                    <p>
                      To.
                      {' '}
                      {order.receiver}
                    </p>
                  </Link>
                </li>
              ))}
            </OrderList>
          </Menu>
        )
        : (<h2>내가 주문한 내역이 없습니다.</h2>) }
    </Container>
  );
}
