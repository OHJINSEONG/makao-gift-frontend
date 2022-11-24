const { render, waitFor, screen } = require('@testing-library/react');
const { productStore } = require('../stores/ProductStore');
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

test('storepage', async () => {
  render(<StorePage />);

  await waitFor(() => {
    screen.getByText('한우팝니다');
  });
});
