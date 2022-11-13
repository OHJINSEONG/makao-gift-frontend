/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import useUserStore from '../hooks/useUserStore';

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const userStore = useUserStore();

  const onSubmit = async (data) => {
    await userStore.create(data);
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
          {...register('name', { required: true })}
        />
      </div>
      <div>
        <label htmlFor="input-userName">
          아이디
        </label>
        <input
          id="input-userName"
          type="text"
          name="userName"
          {...register('userName', { required: true })}
        />
      </div>
      <div>
        <label htmlFor="input-password">
          비밀번호
        </label>
        <input
          id="input-password"
          type="text"
          name="password"
          {...register('password', { required: true })}
        />
      </div>
      <div>
        <label htmlFor="input-reconfirmPassword">
          비밀번호 재확인
        </label>
        <input
          id="input-reconfirmPassword"
          type="text"
          name="reconfirmPassword"
          {...register('reconfirmPassword', { required: true })}
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
}
