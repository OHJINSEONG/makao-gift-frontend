const {
  render, screen, fireEvent, waitFor,
} = require('@testing-library/react');
const { default: SignUpForm } = require('./SignUpForm.jsx');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

test('signUp-form', () => {
  render(<SignUpForm />);
});

test('signUp-form-screen', () => {
  render(<SignUpForm />);

  screen.getByLabelText('이름:');

  screen.getByLabelText('아이디:');

  screen.getByLabelText('비밀번호:');

  screen.getByLabelText('비밀번호 확인:');

  screen.getByText('회원가입');
});

test('signUp-form-inputChange', () => {
  render(<SignUpForm />);

  fireEvent.change(screen.getByLabelText('이름:'), {
    target: { value: '오진성' },
  });

  fireEvent.change(screen.getByLabelText('아이디:'), {
    target: { value: 'ojseong0828' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
    target: { value: 'Wlstjdcjs153!' },
  });
});

test('signUp-form-signUpSuccess', async () => {
  render(<SignUpForm />);

  fireEvent.change(screen.getByLabelText('이름:'), {
    target: { value: '오진성' },
  });

  fireEvent.change(screen.getByLabelText('아이디:'), {
    target: { value: 'ojs0828' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.click(screen.getByText('회원가입'));

  await waitFor(() => {
    expect(navigate).toBeCalledWith('/signupSuccess');
  });
});

test('signUp-form-signUpWithInputExistedUserName', async () => {
  render(<SignUpForm />);

  fireEvent.change(screen.getByLabelText('이름:'), {
    target: { value: '오진성' },
  });

  fireEvent.change(screen.getByLabelText('아이디:'), {
    target: { value: 'ojseong0828' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.click(screen.getByText('회원가입'));

  await waitFor(() => {
    screen.getByText('해당 아이디는 사용할수 없습니다.');
  });
});

test('signUp-form-signUpFailedWithReconfirmError', async () => {
  render(<SignUpForm />);

  fireEvent.change(screen.getByLabelText('이름:'), {
    target: { value: '오진성' },
  });

  fireEvent.change(screen.getByLabelText('아이디:'), {
    target: { value: 'ojs0828' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
    target: { value: 'Wlstjdcjs153!!' },
  });

  fireEvent.click(screen.getByText('회원가입'));

  await waitFor(() => {
    screen.getByText('비밀번호가 일치하지 않습니다.');
  });
});

test('signUp-form-signUpFailedWithBlankName', async () => {
  render(<SignUpForm />);

  fireEvent.change(screen.getByLabelText('이름:'), {
    target: { value: '' },
  });

  fireEvent.change(screen.getByLabelText('아이디:'), {
    target: { value: 'ojs0828' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.click(screen.getByText('회원가입'));

  await waitFor(() => {
    screen.getByText('이름을 입력해주세요.');
  });
});

test('signUp-form-signUpFailedWithBlankUserName', async () => {
  render(<SignUpForm />);

  fireEvent.change(screen.getByLabelText('이름:'), {
    target: { value: '오진성' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.click(screen.getByText('회원가입'));

  await waitFor(() => {
    screen.getByText('아이디를 입력해주세요.');
  });
});

test('signUp-form-signUpFailedWithBlankPassword', async () => {
  render(<SignUpForm />);

  fireEvent.change(screen.getByLabelText('이름:'), {
    target: { value: '오진성' },
  });

  fireEvent.change(screen.getByLabelText('아이디:'), {
    target: { value: 'ojs0828' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.click(screen.getByText('회원가입'));

  await waitFor(() => {
    screen.getByText('비밀번호를 입력해주세요.');
  });
});

test('signUp-form-signUpFailedWithBlankReconfirmPassword', async () => {
  render(<SignUpForm />);

  fireEvent.change(screen.getByLabelText('이름:'), {
    target: { value: '오진성' },
  });

  fireEvent.change(screen.getByLabelText('아이디:'), {
    target: { value: 'ojs0828' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호:'), {
    target: { value: 'Wlstjdcjs153!' },
  });

  fireEvent.click(screen.getByText('회원가입'));

  await waitFor(() => {
    screen.getByText('비밀번호 확인을 입력해주세요.');
  });
});
