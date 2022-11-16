const { render } = require('@testing-library/react');
const { default: OrderProductPage } = require('./OrderProductPage');

test('orderProductPage', () => {
  render(<OrderProductPage />);
});
