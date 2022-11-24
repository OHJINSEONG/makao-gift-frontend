import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useOrderStore from '../hooks/useOrderStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;

  .manufacturer {
    margin: 2px 0px;
  }

  .receiver {
    margin-top: 2px;
    color :black
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;

  h2 {
    font-size: 1em;
    width: 700px;
    align-self: flex-start;
  }
`;

const OrderList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 840px;

  li{
    width: 200px;
    height: 250px;
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
  width: 150px;
  height: 150px;
`;

const Imformation = styled.div`
  width: 150px;
  height: 20px;
  
  color : gray;
  font-size: .2em;
`;

export default function OrderListPage() {
  const orderStore = useOrderStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
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
                    <Image src={order.image} />
                    <Imformation>
                      <p className="manufacturer">
                        제조사 :
                        {' '}
                        {order.manufacturer}
                      </p>
                      <h1>{order.title}</h1>
                      <p className="receiver">
                        To.
                        {' '}
                        {order.receiver}
                      </p>
                    </Imformation>
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
