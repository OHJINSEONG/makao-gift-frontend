const { render, screen } = require('@testing-library/react');
const { default: LoginPage } = require('./LoginPage.jsx');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate: () => navigate,
}));

test('SignUpPage', () => {
  render(<LoginPage />);

  screen.getByText('USER LOGIN');
});
