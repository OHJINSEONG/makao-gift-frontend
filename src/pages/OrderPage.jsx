/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore.js';
import useUserStore from '../hooks/useUserStore.js';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 550px;
  font-size: .4em;

  .error {
    color : red;
  }
  `;

const Wrapper = styled.div`
  padding: 40px;
  border-radius: 20px;
  border: solid 1px black;
`;

const Button = styled.button`
  width: 400px;
  height: 35px;
  margin-top: 10px;
  color : white;
  background-color: #22daab;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const Input = styled.div`
  display: flex;
  width: 400px;
  margin-top: 10px;
  flex-direction: column;

  label{
    margin-bottom: .3em;
  }

  input{
    height: 30px;
    border-style: double;
    margin-bottom: 5px;
  }

  p{
    color : #999999
  }
`;

const Menu = styled.div`
  display: flex;
`;

const Imformation = styled.div`
  display: flex;
  width: 300px;
  margin-left: 20px;
  flex-direction: column;
  justify-content: space-between;
`;

export default function OrderPage() {
  const navigator = useNavigate();
  const orderStore = useOrderStore();
  const userStore = useUserStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSubmitOrder = async (data) => {
    await orderStore.createOrder(data);
    userStore.fetchUser();
    navigator('/orders');
  };

  return (
    <Container onSubmit={handleSubmit(handleSubmitOrder)}>
      <Wrapper>
        <Menu>
          <Image src={orderStore.productImformation.image} />
          <Imformation>
            <p>
              제조사
              {' '}
              {orderStore.productImformation.manufacturer}
            </p>
            <p>{orderStore.productImformation.title}</p>
            <p>
              구매수량:
              {' '}
              {orderStore.productImformation.amount}
            </p>
            <p>
              총 상품금액:
              {' '}
              {orderStore.productImformation.totalPrice}
              원
            </p>
          </Imformation>
        </Menu>
        <Input>
          <label htmlFor="input-receiver">
            받는 분 성함
          </label>
          <input
            id="input-receiver"
            type="text"
            name="receiver"
            {...register('receiver', { required: true })}
          />
          <p className={errors.receiver ? 'error' : 'default'}>
            {errors.receiver ? '성함을 입력해주세요.'
              : '3~7자까지 한글만 사용 가능'}
          </p>
        </Input>
        <Input>
          <label htmlFor="input-address">
            받는 분 주소
          </label>
          <input
            id="input-address"
            type="text"
            name="address"
            {...register('address', { required: true })}
          />
          <p className={errors.address ? 'error' : 'default'}>
            {errors.address ? '주소를 입력해주세요.'
              : '주소지를 입력해주세요'}
          </p>
        </Input>
        <Input>
          <label htmlFor="input-message">
            받는 분께 보내는 메세지
          </label>
          <input
            id="input-message"
            type="text"
            name="message"
            {...register('message')}
          />
          <p>100글자 이내로 입력해주세요.</p>
        </Input>
        <Button type="submit">선물하기</Button>
      </Wrapper>
    </Container>
  );
}
