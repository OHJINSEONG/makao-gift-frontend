const { render, screen } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');
const { default: App } = require('./App.jsx');

test('App', () => {
  render((
    <div>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </div>
  ));

  screen.getByText('무얼 선물할 지 고민이라면');
});
