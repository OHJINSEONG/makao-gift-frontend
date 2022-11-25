/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useProductStore from '../hooks/useProductStore.js';
import useUserStore from '../hooks/useUserStore.js';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;

  h1{
    border-bottom: 1px solid black;
    margin-bottom: 30px;
  }

  p {
    margin-top: 10px;
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
  const { register, handleSubmit } = useForm();
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
          {...register('userName')}
        />
      </Wrapper>
      <Wrapper>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="비밀번호"
          {...register('password')}
        />
        {userStore.isLoginError ? (
          <p>{userStore.errorMessage}</p>
        ) : null}
      </Wrapper>
      <Button type="submit">로그인하기</Button>
      <Link to="/signup">회원가입</Link>
    </Container>
  );
}
