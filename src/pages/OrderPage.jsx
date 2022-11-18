/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  `;

const Wrapper = styled.div`
  padding: 40px;
  border-radius: 20px;
  border: solid 1px black;
`;

const Button = styled.button`
  width: 200px;
  height: 35px;
  margin-top: 10px;
  color : white;
  background-color: #22daab;
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
        <div>
          <label htmlFor="input-receiver">
            받는 분 성함
          </label>
          <input
            id="input-receiver"
            type="text"
            name="receiver"
            {...register('receiver', { required: '성함을 입력해주세요.' })}
          />
          <p>{errors.receiver?.message}</p>
        </div>
        <div>
          <label htmlFor="input-address">
            받는 분 주소
          </label>
          <input
            id="input-address"
            type="text"
            name="address"
            {...register('address', { required: '주소를 입력해주세요.' })}
          />
          <p>{errors.address?.message}</p>
        </div>
        <div>
          <label htmlFor="input-message">
            받는 분께 보내는 메세지
          </label>
          <input
            id="input-message"
            type="text"
            name="message"
            {...register('message')}
          />
        </div>
        <Button type="submit">선물하기</Button>
      </Wrapper>
    </Container>
  );
}
