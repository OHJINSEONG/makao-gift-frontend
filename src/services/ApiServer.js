import axios from 'axios';

export default class ApiServer {
  constructor() {
    this.accessToken = '';
  }

  async create({
    name, userName, password, reconfirmPassword,
  }) {
    await axios.post('http://localhost:8000/session', {
      name, userName, password, reconfirmPassword,
    });
  }
}

export const apiServer = new ApiServer();
