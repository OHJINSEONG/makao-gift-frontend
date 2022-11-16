const { render } = require('@testing-library/react');
const { default: ProductPage } = require('./ProductPage');

const navigator = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigator,
  useParams: () => ({
    productId: 1,
  }),
}));

test('productPage', () => {
  render(<ProductPage />);
});
