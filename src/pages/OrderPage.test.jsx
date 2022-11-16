const { render } = require('@testing-library/react');
const { default: OrderPage } = require('./OrderPage');

const navigator = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigator,
}));

test('orderPage', () => {
  render(<OrderPage />);
});
