/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../hooks/useOrderStore';
import useUserStore from '../hooks/useUserStore';

export default function OrderPage() {
  const navigator = useNavigate();
  const orderStore = useOrderStore();
  const userStore = useUserStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSubmitOrder = async (data) => {
    await orderStore.order(data);
    userStore.fetchUser();
    navigator('/orders');
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitOrder)}>
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
      <button type="submit">선물하기</button>
    </form>
  );
}
