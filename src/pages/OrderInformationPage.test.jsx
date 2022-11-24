const { render, screen, waitFor } = require('@testing-library/react');
const { default: OrderInformationPage } = require('./OrderInformationPage');

const navigator = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigator(),
  useParams: () => ({
    orderId: 1,
  }),
}));

test('orderProductPage', async () => {
  render(<OrderInformationPage />);

  await waitFor(() => {
    screen.getByText('잘먹어라');
  });
});
