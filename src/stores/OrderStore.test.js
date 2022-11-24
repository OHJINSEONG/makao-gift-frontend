const { default: OrderStore } = require('./OrderStore');

const context = describe;

describe('orderStore', () => {
  let orderStore;

  beforeEach(() => {
    orderStore = new OrderStore();
  });

  describe('fetchOrders', () => {
    context('withLogin', () => {
      const accessToken = 'Token';

      it('fetchOrders-success', async () => {
        await orderStore.fetchOrders(1, accessToken);

        expect(orderStore.orders.length).toEqual(2);
      });

      it('fetchOrders-success-secondPage', async () => {
        await orderStore.fetchOrders(2, accessToken);

        expect(orderStore.orders.length).toEqual(0);
      });
    });

    context('withOutLogin', () => {
      it('fetchOrders-fail', async () => {
        await orderStore.fetchOrders(1, '');

        expect(orderStore.errorMessage).toEqual('토큰 넣어주세요');
      });
    });
  });

  describe('find', () => {
    it('find-success', async () => {
      await orderStore.find(1);

      expect(orderStore.order.address).toEqual('세종');
      expect(orderStore.order.amount).toEqual(1);
      expect(orderStore.order.dateOfPurchase).toEqual('2022-11-15');
      expect(orderStore.order.id).toEqual(1);
    });

    it('find-success', async () => {
      await orderStore.find(0);

      expect(orderStore.errorMessage).toEqual('없는 주문내역입니다');
    });
  });

  describe('fetchProductImpormation', () => {
    it('fetchProductImpormation', () => {
      orderStore.fetchProductImformation({ totalPrice: 30000 });

      expect(orderStore.productImformation.totalPrice).toEqual(30000);
    });
  });

  describe('createOrder', () => {
    it('createOrder-success', async () => {
      await orderStore.createOrder({
        receiver: '오진성',
        address: '세종',
        message: '잘먹어라',
      });

      expect(orderStore.errorMessage).toEqual('');
    });

    it('createOrderWithOutReceiver', async () => {
      await orderStore.createOrder({
        receiver: '',
        address: '세종',
        message: '잘먹어라',
      });

      expect(orderStore.errorMessage).toEqual('입력사항을 기입해주세요');
    });

    it('createOrderWithOutAddress', async () => {
      await orderStore.createOrder({
        receiver: '오진성',
        address: '',
        message: '잘먹어라',
      });

      expect(orderStore.errorMessage).toEqual('입력사항을 기입해주세요');
    });
  });
});
