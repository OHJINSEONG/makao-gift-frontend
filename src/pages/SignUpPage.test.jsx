const { render, screen } = require('@testing-library/react');
const { default: SignUpPage } = require('./SignUpPage');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

test('SignUpPage', () => {
  render(<SignUpPage />);

  screen.getByText('SIGN UP');
});
