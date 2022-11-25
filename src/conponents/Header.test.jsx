const { render, screen } = require('@testing-library/react');
const { default: Header } = require('./Header.jsx');

const navigate = jest.fn();

const context = describe;

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

describe('header', () => {
  it('render "home" link', () => {
    render(<Header />);

    screen.getByText(/홈/);
  });

  it('render "store" link', () => {
    render(<Header />);

    screen.getByText(/스토어/);
  });

  it('render "order" link', () => {
    render(<Header />);

    screen.getByText(/주문조회/);
  });

  context('without loggin', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    it('render "login" button', () => {
      render(<Header />);

      screen.getByText(/로그인/);
    });

    it('render "signUp" button', () => {
      render(<Header />);

      screen.getByText(/회원가입/);
    });
  });

  context('with loggin', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('TOKEN'));
    });

    it('render "logout" button', () => {
      render(<Header />);

      screen.getByText(/로그아웃/);
    });

    it('render my amount', () => {
      render(<Header />);

      screen.getByText(/내 잔액:/);
    });
  });
});
