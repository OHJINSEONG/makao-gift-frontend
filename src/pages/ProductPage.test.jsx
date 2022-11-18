const {
  render, screen, waitFor, fireEvent,
} = require('@testing-library/react');
const { default: LoginForm } = require('./LoginForm');
const { default: ProductPage } = require('./ProductPage');

const navigator = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigator,
  useParams: () => ({
    productId: 1,
  }),
}));

// jest.mock('../stores/UserStore', () => ({
//   UserStore: () => ({
//     name: '진성',
//     amount: 50000,
//     erorzz
//   }),
// }));

beforeEach(() => {

});

test('productPage-screen', async () => {
  render(<ProductPage />);

  await waitFor(() => {
    screen.getByText('한우팝니다');
    screen.getByText('맛있음');
    screen.getByText('10000원');
    screen.getByText('+');
    screen.getByText('1');
    screen.getByText('선물하기');
  });
});

// test('productPage-addAmount', async () => {
//   render(<ProductPage />);

//   fireEvent.click(screen.getByText('+'));

//   await waitFor(() => {
//     screen.getByText('20000원');
//   });
// });

// test('productPage-minusAmount', async () => {
//   render(<ProductPage />);

//   fireEvent.click(screen.getByText('+'));
//   fireEvent.click(screen.getByText('-'));

//   await waitFor(() => {
//     screen.getByText('10000원');
//   });
// });

// test('productPage-minusAmount', async () => {
//   render(<ProductPage />);

//   fireEvent.click(screen.getByText('+'));
//   fireEvent.click(screen.getByText('-'));

//   await waitFor(() => {
//     screen.getByText('10000원');
//   });
// });

// test('productPage-order', async () => {
//   render(<ProductPage />);

//   fireEvent.click(screen.getByText('선물하기'));

//   await waitFor(() => {
//     screen.getByText('잔액이 부족하여 선물하기가 불가합니다.');
//   });
// });
