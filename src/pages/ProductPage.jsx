import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useOrderStore from '../hooks/useOrderStore';

import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';
import { apiService } from '../services/ApiService';

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

    console.log(productStore.product);

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
    <div>
      <p>{productStore.product.title}</p>
      <p>{productStore.product.price}</p>
      <p>{productStore.product.manufacturer}</p>
      <p>{productStore.product.imformation}</p>
      <p>
        {totalPrice}
        원
      </p>
      <div>
        {amount === 1
          ? null
          : (<button type="button" onClick={handleClickMinusAmount}>-</button>) }
        <p>{amount}</p>
        <button type="button" onClick={handleClickAddAmount}>+</button>
      </div>
      <button type="button" onClick={handleClickOrder}>선물하기</button>
      {userStore.isNotEnoughAmount
        ? (<p>{userStore.errorMessage}</p>)
        : null}
    </div>
  );
}
