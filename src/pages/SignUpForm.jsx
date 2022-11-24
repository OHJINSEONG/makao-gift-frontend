/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 540px;
  
  
  p{
    font-size: 1px;
    color : #999999
  }

  h1{
    width: 260px;
    text-align: center;
    border-bottom: 1px solid #22daab;
    margin-bottom: 30px;
  }

  .over {
    color : black;
  }

  .clicked {
    background-color: #008c69;
  }

  .error {
    color: red
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 260px;
  flex-direction: column;
  margin-bottom: 10px;

  label{
    font-size: .4em;
    margin-bottom: .3em;
  }

  input{
    height: 30px;
    border-style: double;    
  }
`;

const Button = styled.button`
  width: 260px;
  height: 35px;
  margin-top: 10px;
  color : white;
  background-color: #22daab;
`;

export default function SignUpForm() {
  const navigate = useNavigate();
  const [registerHover, setRegisterHover] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const userStore = useUserStore();

  const onSubmit = async (data) => {
    userStore.errorCodeReset();
    await userStore.create(data);
    if (!userStore.erroeCode) {
      await navigate('/signupSuccess');
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <h1>SIGN UP</h1>
      <Wrapper>
        <label htmlFor="input-name">
          이름:
        </label>
        <input
          id="input-name"
          type="text"
          name="name"
          {...register('name', {
            required: '이름을 입력해주세요.',
            minLength: { message: '이름을 다시 확인해주세요.', value: 3 },
            maxLength: { message: '이름을 다시 확인해주세요.', value: 7 },
          })}
        />
        <p className={errors.name ? 'error' : 'default'}>
          {errors.name ? errors.name.message
            : '3~7자까지 한글만 사용 가능'}
        </p>
      </Wrapper>
      <Wrapper>
        <label htmlFor="input-userName">
          아이디:
        </label>
        <input
          id="input-userName"
          type="text"
          name="userName"
          {...register('userName', {
            required: '아이디를 입력해주세요.',
            pattern: { message: '아이디를 다시 확인해주세요.', value: /^[A-Za-z0-9]{4,16}$/ },
          })}
        />
        <p className={errors.userName ? 'error' : 'default'}>
          {errors.userName ? errors.userName.message
            : '영문소문자/숫자,4~16자만 사용 가능'}
        </p>
        {userStore.isExistUserNameError ? (
          <p className="error">{userStore.errorMessage}</p>
        ) : null}
      </Wrapper>
      <Wrapper>
        <label htmlFor="input-password">
          비밀번호:
        </label>
        <input
          id="input-password"
          type="password"
          name="password"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            pattern: {
              message: '비밀번호를 다시 확인해주세요.',
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
            },
          })}
        />
        <p className={errors.password ? 'error' : 'default'}>
          {errors.password ? errors.password.message
            : '8글자 이상의 영문(대소문자),숫자,특수문자가 모두 포함되어야 함'}
        </p>
      </Wrapper>
      <Wrapper>
        <label htmlFor="input-reconfirmPassword">
          비밀번호 확인:
        </label>
        <input
          id="input-reconfirmPassword"
          type="password"
          name="reconfirmPassword"
          {...register('reconfirmPassword', {
            required: '비밀번호 확인을 입력해주세요.',
          })}
        />
        <p className="error">{errors.reconfirmPassword?.message}</p>
        {userStore.isReconfirmError ? (
          <p className="error">{userStore.errorMessage}</p>
        ) : null}
      </Wrapper>
      <Button
        type="submit"
        // eslint-disable-next-line no-nested-ternary
        className={registerHover === 'over' ? 'over'
          : registerHover === '' ? 'default' : 'clicked'}
        onMouseEnter={() => { setRegisterHover('over'); }}
        onMouseLeave={() => { setRegisterHover(''); }}
        onClick={() => { setRegisterHover('click'); }}
      >
        회원가입
      </Button>
    </Container>
  );
}
