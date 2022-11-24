const {
  render, screen, waitFor, cleanup,
} = require('@testing-library/react');

const { default: OrderListPage } = require('./OrderListPage');

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

test('orderListPageWithNoOrders', () => {
  render((<OrderListPage />));

  screen.getByText('내가 주문한 내역이 없습니다.');
});

test('orderListPageWithOrders', async () => {
  localStorage.setItem('accessToken', JSON.stringify('Token'));

  render(<OrderListPage />);

  await waitFor(() => {
    screen.getByText('내가 주문한 내역입니다.');
    cleanup();
  });
});
