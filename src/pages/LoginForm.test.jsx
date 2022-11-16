const {
  render, screen, fireEvent, waitFor,
} = require('@testing-library/react');

const { default: LoginForm } = require('./LoginForm');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

test('login-form-screen', () => {
  render(<LoginForm />);

  screen.getByText('USER LOGIN');

  screen.getByText('로그인하기');

  screen.getByPlaceholderText('아이디');

  screen.getByPlaceholderText('비밀번호');
});

test('login-form-inputChange', () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByPlaceholderText('아이디'), {
    target: { value: 'ojseong0828' },
  });

  fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
    target: { value: 'password' },
  });
});

test('login-form-loginSuccess', async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByPlaceholderText('아이디'), {
    target: { value: 'ojseong0828' },
  });

  fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.click(screen.getByText('로그인하기'));

  await waitFor(() => {
    expect(navigate).toBeCalledWith('/');
  });
});

test('login-form-loginWithWrongUserName', async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByPlaceholderText('아이디'), {
    target: { value: 'wrong' },
  });

  fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.click(screen.getByText('로그인하기'));

  await waitFor(() => {
    screen.getByText('아이디 혹은 비밀번호가 맞지 않습니다.');
  });
});

test('login-form-loginFailedWithBlankUserName', async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.click(screen.getByText('로그인하기'));

  await waitFor(() => {
    screen.getByText('아이디를 입력해주세요.');
  });
});

test('login-form-loginFailedWithBlankPassword', async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByPlaceholderText('아이디'), {
    target: { value: 'ojseong0828' },
  });

  fireEvent.click(screen.getByText('로그인하기'));

  await waitFor(() => {
    screen.getByText('비밀번호를 입력해주세요.');
  });
});
