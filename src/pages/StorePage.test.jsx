const { render } = require('@testing-library/react');
const { default: StorePage } = require('./StorePage');

const navigator = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate: () => navigator,
}));

test('storepage', () => {
  render(<StorePage />);
});
