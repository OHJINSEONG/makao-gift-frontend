const { render, screen, waitFor } = require('@testing-library/react');
const { default: OrderInformation } = require('./OrderInformation.jsx');

const navigator = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigator(),
}));

test('orderProductPage', async () => {
  render(<OrderInformation orderId={1} />);

  await waitFor(() => {
    screen.getByText('잘먹어라');
  });
});
