const { render, screen } = require('@testing-library/react');
const { default: HomePage } = require('./HomePage.jsx');

test('homePage', () => {
  render(<HomePage />);

  screen.getByText('무얼 선물할 지 고민이라면');
});
