const { render } = require('@testing-library/react');
const { default: OrderListPage } = require('./OrderListPage');

test('orderListPage', () => {
  render(<OrderListPage />);
});
