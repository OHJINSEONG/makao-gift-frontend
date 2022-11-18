const { render, screen } = require('@testing-library/react');
const { default: OrderProductPage } = require('./OrderProductPage');

test('orderProductPage', () => {
  render(<OrderProductPage />);

  screen.findByText('구매수량');
});
