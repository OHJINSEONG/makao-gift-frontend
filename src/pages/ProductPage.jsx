import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';

import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';
import { apiService } from '../services/ApiService';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  margin-right: 30px;
`;

const CountButton = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function ProductPage() {
  const productStore = useProductStore();
  const userStore = useUserStore();
  const orderStore = useOrderStore();
  const navigator = useNavigate();

  const { productId } = useParams();

  const [amount, setAmount] = useState(1);

  const totalPrice = amount * productStore.product.price;

  useEffect(() => {
    productStore.find(productId);
  }, []);

  const handleClickMinusAmount = () => {
    setAmount(amount - 1);
  };

  const handleClickAddAmount = () => {
    setAmount(amount + 1);
  };

  const handleClickOrder = () => {
    if (!apiService.accessToken) {
      productStore.changeStatus(productId);
      navigator('/login');
    }

    if (totalPrice > userStore.amount) {
      userStore.changeErrorState(
        2000,
        { errorMessage: '잔액이 부족하여 선물하기가 불가합니다.' },
      );
      return;
    }

    if (apiService.accessToken) {
      orderStore.fetchProductImformation({
        totalPrice,
        amount,
        title: productStore.product.title,
        manufacturer: productStore.product.manufacturer,
      });
      navigator('/order');
    }
  };

  return (
    <Container>
      <Image className="productImage" alt="productImage" src={require('../images/food.jpg')} />
      <Wrapper>
        <h1>{productStore.product.title}</h1>
        <h2>
          {productStore.product.price}
          원
        </h2>
        <p>
          제조사
          {' '}
          {productStore.product.manufacturer}
        </p>
        <CountButton>
          <p>
            상품 수량
            {'  '}
          </p>
          <CountButton>
            <button disabled={amount === 1} type="button" onClick={handleClickMinusAmount}>-</button>
            <p>{amount}</p>
            <button type="button" onClick={handleClickAddAmount}>+</button>
          </CountButton>
        </CountButton>
        <p>
          상품설명
          {' '}
          {productStore.product.imformation}
        </p>
        <p>
          {totalPrice}
          원
        </p>
        <button type="button" onClick={handleClickOrder}>선물하기</button>
        {userStore.isNotEnoughAmount
          ? (<p>{userStore.errorMessage}</p>)
          : null}
      </Wrapper>
    </Container>
  );
}
