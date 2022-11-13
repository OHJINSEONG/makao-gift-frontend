/* eslint-disable class-methods-use-this */
import { apiServer } from '../services/ApiServer';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();
    this.name = '';
    this.userName = '';
    this.amount = 0;
  }

  async create({
    name, userName, password, reconfirmPassword,
  }) {
    await apiServer.create({
      name, userName, password, reconfirmPassword,
    });
  }
}

export const userStore = new UserStore();
