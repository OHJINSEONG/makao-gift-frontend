/* eslint-disable class-methods-use-this */
import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();
    this.products = [];
    this.product = {};
    this.pages = [];
    this.productId = 0;
    this.errorMessage = '';
  }

  async fetchProducts(page) {
    try {
      const { products, pages } = await apiService.productsList(page);

      this.products = products;
      this.pages = pages;
    } catch (e) {
      this.errorMessage = '없는 페이지입니다';
    }

    this.publish();
  }

  async find(id) {
    try {
      const product = await apiService.findProduct(id);
      this.product = product;
    } catch (e) {
      this.errorMessage = '없는 상품입니다';
    }

    this.publish();
  }

  changeStatus(productId) {
    this.productId = productId;
  }
}

export const productStore = new ProductStore();
