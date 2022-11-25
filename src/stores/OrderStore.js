/* eslint-disable class-methods-use-this */
import { apiService } from '../services/ApiService.js';
import Store from './Store.js';

export default class OrderStore extends Store {
  constructor() {
    super();
    this.orders = [];
    this.order = {};
    this.pages = [];
    this.receiver = '';
    this.message = '';
    this.productImformation = {};
    this.errorMessage = '';
  }

  async fetchOrders(page, accessToken) {
    try {
      const { orders, pages } = await apiService.ordersList(page, accessToken);

      this.orders = orders;
      this.pages = pages;
    } catch (e) {
      this.errorMessage = '토큰 넣어주세요';
    }

    this.publish();
  }

  async find(id) {
    try {
      const order = await apiService.findOrder(id);

      this.order = order;
    } catch (e) {
      this.errorMessage = '없는 주문내역입니다';
    }

    this.publish();
  }

  fetchProductImformation(productImformation) {
    this.productImformation = productImformation;
  }

  async createOrder(data) {
    const { receiver, address, message } = data;

    try {
      await apiService.order({
        receiver,
        address,
        message,
        totalPrice: this.productImformation.totalPrice,
        amount: this.productImformation.amount,
        title: this.productImformation.title,
        manufacturer: this.productImformation.manufacturer,
        image: this.productImformation.image,

      });
    } catch (e) {
      this.errorMessage = '입력사항을 기입해주세요';
    }

    this.publish();
  }
}

export const orderStore = new OrderStore();
