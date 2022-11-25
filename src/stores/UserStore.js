/* eslint-disable class-methods-use-this */
import { apiService } from '../services/ApiService.js';
import Store from './Store.js';

export default class UserStore extends Store {
  constructor() {
    super();
    this.name = '';
    this.amount = 0;
    this.errorCode = 0;
  }

  async fetchUser() {
    const { name, amount } = await apiService.findUser();

    this.name = name;
    this.amount = amount;

    this.publish();
  }

  async create({
    name, userName, password, reconfirmPassword,
  }) {
    try {
      await apiService.create({
        name, userName, password, reconfirmPassword,
      });
    } catch (e) {
      const { code, message } = e.response.data;

      this.changeErrorState(code, { errorMessage: message });
    }
  }

  async login({ userName, password }) {
    try {
      const {
        accessToken, name, amount,
      } = await apiService.login({ userName, password });

      this.name = name;
      this.amount = amount;
      this.publish();

      return accessToken;
    } catch (e) {
      const { code, message } = e.response.data;

      this.changeErrorState(code, { errorMessage: message });
    }
  }

  changeErrorState(code, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.erroeCode = code;
    this.publish();
  }

  errorCodeReset() {
    this.erroeCode = 0;
  }

  get isReconfirmError() {
    return this.erroeCode === 1000;
  }

  get isExistUserNameError() {
    return this.erroeCode === 1001;
  }

  get isLoginError() {
    return this.erroeCode === 1002;
  }

  get isNotEnoughAmount() {
    return this.erroeCode === 2000;
  }
}

export const userStore = new UserStore();
