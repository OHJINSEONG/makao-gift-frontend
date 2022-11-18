const { default: OrderStore } = require('./OrderStore');

const context = describe;

describe('orderStore', () => {
  let orderStore;

  beforeEach(() => {
    orderStore = new OrderStore();
  });

  context('fetchOrders', () => {
    it('fetchFirstPage', () => {
      orderStore.fetchOrders(1);
    });
  });
});
