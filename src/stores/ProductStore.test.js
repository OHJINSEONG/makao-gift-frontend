const { default: ProductStore } = require('./ProductStore.js');

describe('productStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('fetchProducts', () => {
    it('fetchFirstPageProducts', async () => {
      await productStore.fetchProducts(1);

      expect(productStore.products.length).toEqual(2);
    });

    it('fetchSecondPageProducts', async () => {
      await productStore.fetchProducts(2);

      expect(productStore.errorMessage).toEqual('없는 페이지입니다');
    });
  });

  describe('find', () => {
    it('find-success', async () => {
      await productStore.find(1);

      expect(productStore.product.imformation).toEqual('맛있음');
      expect(productStore.product.name).toEqual('한우');
      expect(productStore.product.price).toEqual(10000);
    });

    it('find-unExistProduct', async () => {
      await productStore.find(2);

      expect(productStore.errorMessage).toEqual('없는 상품입니다');
    });
  });

  describe('changeStatus', () => {
    it('changeStatus', async () => {
      expect(productStore.productId).toEqual(0);

      await productStore.changeStatus(1);

      expect(productStore.productId).toEqual(1);
    });
  });
});
