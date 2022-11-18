const { default: ProductStore } = require('./ProductStore');

const context = describe;

describe('productStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  context('fetchProducts', () => {
    it('fetchFirstPage', () => {
      productStore.fetchProducts(1);
    });
  });
});
