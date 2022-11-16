const {
  render, screen, fireEvent,
} = require('@testing-library/react');
const { default: SignUpSuccessPage } = require('./SignUpSuccessPage');

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

test('signupSuccess', async () => {
  render(<SignUpSuccessPage />);

  screen.getByText('회원가입 완료');

  screen.getByText('로그인하기');

  fireEvent.click(screen.getByText('로그인하기'));
});
