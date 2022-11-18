/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;

  h1{
    border-bottom: 1px solid black;
  }

  p {
    font-size: .3em;
    color: red
  }

  a {
    font-size: .9em;
    margin-top: 10px;
    color: black;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;

  label{
    font-size: .4em;
    margin-bottom: .3em;
  }

  input{
    padding: 10px;
    height: 30px;
    font-size: .5em;
    border-style: double;
  }
`;

const Button = styled.button`
  width: 200px;
  height: 35px;
  margin-top: 10px;
  color : white;
  background-color: #22daab;
`;

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
    <Container onSubmit={handleSubmit(onSubmit)}>
      <h1>USER LOGIN</h1>
      <Wrapper>
        <input
          id="input-userName"
          type="text"
          name="userName"
          placeholder="아이디"
          {...register('userName', {
            required: '아이디를 입력해주세요.',
          })}
        />
      </Wrapper>
      <p>{errors.userName?.message}</p>
      <Wrapper>
        <input
          id="input-password"
          type="text"
          name="password"
          placeholder="비밀번호"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
        />
      </Wrapper>
      <p>{errors.password?.message}</p>
      {userStore.isLoginError ? (
        <p>{userStore.errorMessage}</p>
      ) : null}
      <Button type="submit">로그인하기</Button>
      <Link to="/signup">회원가입</Link>
    </Container>
  );
}
