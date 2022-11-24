const {
  render, screen, waitFor, fireEvent,
} = require('@testing-library/react');
const { default: OrderPage } = require('./OrderPage');

const navigator = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigator,
}));

test('orderPageWithScreen', async () => {
  render(<OrderPage />);

  screen.getByText('제조사');
  screen.getByText('선물하기');
  screen.getByLabelText('받는 분 성함');
  screen.getByLabelText('받는 분 주소');
  screen.getByLabelText('받는 분께 보내는 메세지');
});

test('orderPageWithOutName', async () => {
  render(<OrderPage />);

  fireEvent.change(screen.getByLabelText('받는 분 성함'), {
    target: { value: '오진성' },
  });

  fireEvent.click(screen.getByText('선물하기'));

  await waitFor(() => {
    screen.getByText('주소를 입력해주세요.');
  });
});

test('orderPageWithOutAddress', async () => {
  render(<OrderPage />);

  fireEvent.change(screen.getByLabelText('받는 분 주소'), {
    target: { value: '세종시' },
  });

  fireEvent.click(screen.getByText('선물하기'));

  await waitFor(() => {
    screen.getByText('성함을 입력해주세요.');
  });
});

test('orderPageWithOutAddress', async () => {
  render(<OrderPage />);

  fireEvent.change(screen.getByLabelText('받는 분 성함'), {
    target: { value: '오진성' },
  });

  fireEvent.change(screen.getByLabelText('받는 분 주소'), {
    target: { value: '세종시' },
  });

  fireEvent.click(screen.getByText('선물하기'));

  await waitFor(() => {
    expect(navigator).toBeCalledWith('/orders');
  });
});
