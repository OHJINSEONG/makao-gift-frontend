/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';

export default function LoginForm() {
  const navigate = useNavigate();
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [productUrl, setProductUrl] = useState('');

  const userStore = useUserStore();
  const productStore = useProductStore();

  useEffect(() => {
    if (productStore.productId) {
      setProductUrl(`/products/${productStore.productId}`);
    }
    productStore.changeStatus('');
  }, []);

  const onSubmit = async (data) => {
    userStore.errorCodeReset();

    const accessToken = await userStore.login(data);

    if (accessToken) {
      setAccessToken(accessToken);

      if (productUrl) {
        await navigate(productUrl);
      }
      if (!productUrl) {
        await navigate('/');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>USER LOGIN</h1>
      <div>
        <input
          id="input-userName"
          type="text"
          name="userName"
          placeholder="아이디"
          {...register('userName', {
            required: '아이디를 입력해주세요.',
          })}
        />
      </div>
      <div>
        <input
          id="input-password"
          type="text"
          name="password"
          placeholder="비밀번호"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
        />
      </div>
      <p>{errors.userName?.message}</p>
      <p>{errors.password?.message}</p>
      {userStore.isLoginError ? (
        <p>{userStore.errorMessage}</p>
      ) : null}
      <button type="submit">로그인하기</button>
    </form>
  );
}
