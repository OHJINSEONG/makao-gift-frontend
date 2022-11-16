/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../hooks/useUserStore';

export default function SignUpForm() {
  const navigate = useNavigate();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="input-name">
          이름
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
        <p>{errors.name?.message}</p>
      </div>
      <div>
        <label htmlFor="input-userName">
          아이디
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
        <p>{errors.userName?.message}</p>
        {userStore.isExistUserNameError ? (
          <p>{userStore.errorMessage}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="input-password">
          비밀번호
        </label>
        <input
          id="input-password"
          type="text"
          name="password"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            pattern: {
              message: '비밀번호를 다시 확인해주세요.',
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
            },
          })}
        />
        <p>{errors.password?.message}</p>
      </div>
      <div>
        <label htmlFor="input-reconfirmPassword">
          비밀번호 확인
        </label>
        <input
          id="input-reconfirmPassword"
          type="text"
          name="reconfirmPassword"
          {...register('reconfirmPassword', {
            required: '비밀번호 확인을 입력해주세요.',
          })}
        />
        <p>{errors.reconfirmPassword?.message}</p>
        {userStore.isReconfirmError ? (
          <p>{userStore.errorMessage}</p>
        ) : null}
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
}
