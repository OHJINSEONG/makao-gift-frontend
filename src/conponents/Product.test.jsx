const {
  screen, waitFor, fireEvent, render, cleanup,
} = require('@testing-library/react');

const { default: Product } = require('./Product');

const navigator = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigator,
  useParams: () => ({
    productId: 1,
  }),
}));

test('product-screen', async () => {
  render(<Product productId={1} />);

  await waitFor(() => {
    screen.getByText('한우팝니다');
    screen.getByText('맛있음');
    screen.getByText('10000원');
    screen.getByText('1');
    screen.getByText('선물하기');
  });
});

test('product-addAmount', async () => {
  render(<Product productId={1} />);

  fireEvent.click(screen.getByAltText('plus'));

  await waitFor(() => {
    screen.getByText(/20000원/);
    cleanup();
  });
});

test('product-minusAmount', async () => {
  render(<Product productId={1} />);

  fireEvent.click(screen.getByAltText('plus'));
  fireEvent.click(screen.getByAltText('minus'));

  await waitFor(() => {
    screen.getByText('10000원');
    cleanup();
  });
});

test('product-order', async () => {
  render(<Product productId={1} />);

  fireEvent.click(screen.getByText('선물하기'));

  await waitFor(() => {
    screen.getByText('잔액이 부족하여 선물하기가 불가합니다.');
    cleanup();
  });
});
