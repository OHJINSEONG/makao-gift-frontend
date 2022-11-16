import axios from 'axios';
import config from '../../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async create({
    name, userName, password, reconfirmPassword,
  }) {
    await axios.post(`${baseUrl}/users`, {
      name, userName, password, reconfirmPassword,
    });
  }

  async login({ userName, password }) {
    const { data } = await axios.post(`${baseUrl}/session`, {
      userName, password,
    });

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async findUser() {
    const { data } = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async productsList(page) {
    const { data } = await axios.get(`${baseUrl}/products?page=${page}`);

    return {
      products: data.productDtos,
      pages: data.pageDtos,
    };
  }

  async findProduct(id) {
    const { data } = await axios.get(`${baseUrl}/products/${id}`);

    return data;
  }

  async order(orderData) {
    await axios.post(`${baseUrl}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async ordersList(page, accessToken) {
    const { data } = await axios.get(`${baseUrl}/orders?page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      orders: data.orderDtos,
      pages: data.pageDtos,
    };
  }

  async findOrder(id) {
    const { data } = await axios.get(`${baseUrl}/orders/${id}`);

    return data;
  }
}

export const apiService = new ApiService();
