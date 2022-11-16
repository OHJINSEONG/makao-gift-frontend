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
  }

  async fetchProducts(page) {
    const { products, pages } = await apiService.productsList(page);

    this.products = products;
    this.pages = pages;

    this.publish();
  }

  async find(id) {
    const product = await apiService.findProduct(id);
    this.product = product;

    this.publish();
  }

  changeStatus(productId) {
    this.productId = productId;
  }
}

export const productStore = new ProductStore();
