/* eslint-disable class-methods-use-this */
import { apiService } from '../services/ApiService';
import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();
    this.orders = [];
    this.order = {};
    this.pages = [];
    this.receiver = '';
    this.message = '';
    this.productImformation = {};
  }

  async fetchOrders(page, accessToken) {
    const { orders, pages } = await apiService.ordersList(page, accessToken);

    this.orders = orders;
    this.pages = pages;

    this.publish();
  }

  async find(id) {
    const order = await apiService.findOrder(id);

    this.order = order;

    this.publish();
  }

  fetchProductImformation(productImformation) {
    this.productImformation = productImformation;
  }

  async order(data) {
    const {
      receiver, address, message, manufacturer,
    } = data;

    await apiService.order({
      receiver,
      address,
      message,
      totalPrice: this.productImformation.totalPrice,
      amount: this.productImformation.amount,
      title: this.productImformation.title,
    });

    this.publish();
  }
}

export const orderStore = new OrderStore();
