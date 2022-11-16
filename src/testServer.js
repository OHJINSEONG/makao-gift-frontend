import { setupServer } from 'msw/node';
import config from '../config';

const { rest } = require('msw');

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { userName, password } = await req.json();

    if (userName === 'ojseong0828' && password === 'Wlstjdcjs153!') {
      return res(ctx.json({
        name: '오진성',
        amount: 50000,
        accessToken: 'Token',
      }));
    }

    return res(
      ctx.status(400),
      ctx.json({
        code: 1002,
        message: '아이디 혹은 비밀번호가 맞지 않습니다.',
      }),
    );
  }),

  rest.post(`${baseUrl}/users`, async (req, res, ctx) => {
    const {
      name, userName, password, reconfirmPassword,
    } = await req.json();

    if (userName === 'ojseong0828') {
      return res(
        ctx.status(400),
        ctx.json({
          code: 1001,
          message: '해당 아이디는 사용할수 없습니다.',
        }),
      );
    }

    if (password !== reconfirmPassword) {
      return res(
        ctx.status(400),
        ctx.json({
          code: 1000,
          message: '비밀번호가 일치하지 않습니다.',
        }),
      );
    }

    return res(ctx.status(200));
  }),
);

export default server;
