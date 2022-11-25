/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore.js';

import useProductStore from '../hooks/useProductStore.js';
import useUserStore from '../hooks/useUserStore.js';
import { apiService } from '../services/ApiService.js';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-size: .7em;

  h1{
    font-size: 1.4em;
    color : #444444
  }

  h2 {
    padding-bottom: 10px;
    font-size: 2em;
    width: 250px;
    border-bottom: solid 1px #999999;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 250px;
  height: 300px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  margin-right: 30px;
`;

const CountButton = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #999999;
  border-radius: 2px;

  img {
    width: 15px;
    height: 15px;
  }
`;

const Button = styled.button`
  width: 250px;
  height: 30px;
  border-radius: 5px;
  margin-top: 10px;
  color : white;
  background-color: #22daab;
`;

const Menu = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #999999;
  padding-bottom: 10px;

  p {
    margin-right: 30px;
  }
`;

export default function Product({ productId }) {
  const productStore = useProductStore();
  const userStore = useUserStore();
  const orderStore = useOrderStore();
  const navigator = useNavigate();

  const [amount, setAmount] = useState(1);

  const totalPrice = amount * productStore.product.price;

  useEffect(() => {
    productStore.find(productId);
  }, []);

  const handleClickMinusAmount = () => {
    if (amount === 1) {
      return;
    }
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
        image: productStore.product.image,
      });
      navigator('/order');
    }
  };

  return (
    <Container>
      <Image className="productImage" alt="productImage" src={productStore.product.image} />
      <Wrapper>
        <h1>{productStore.product.title}</h1>
        <h2>
          {productStore.product.price}
          원
        </h2>
        <Menu>
          <p>
            제조사
          </p>
          <p>
            {productStore.product.manufacturer}
          </p>
        </Menu>
        <Menu>
          <p>
            구매수량
          </p>
          <CountButton>
            <img
              className="minus"
              alt="minus"
              src={amount === 1 ? 'https://user-images.githubusercontent.com/107606892/202984192-e22b7a8e-3527-4361-babd-6d7e14b558bc.png'
                : 'https://user-images.githubusercontent.com/107606892/202984321-a367230a-9617-4e40-9600-57103173eba7.png'}
              type="button"
              onClick={handleClickMinusAmount}
            />
            {amount}
            <img
              className="plus"
              alt="plus"
              src="https://user-images.githubusercontent.com/107606892/202984384-a287432c-bd79-4f84-859a-f04b19e31d5b.png"
              type="button"
              onClick={handleClickAddAmount}
            />
          </CountButton>
        </Menu>
        <Menu>
          <p>
            상품설명
          </p>
          <p>
            {productStore.product.imformation}
          </p>
        </Menu>
        <p>
          총 상품금액:
          {' '}
          {totalPrice}
          원
        </p>
        <Button type="button" onClick={handleClickOrder}>선물하기</Button>
        {userStore.isNotEnoughAmount
          ? (<p>{userStore.errorMessage}</p>)
          : null}
      </Wrapper>
    </Container>
  );
}
