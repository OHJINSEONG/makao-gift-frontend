import { setupServer } from 'msw/node';
import { useParams } from 'react-router-dom';
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

  rest.get(`${baseUrl}/products`, async (req, res, ctx) => {
    await res(
      ctx.json({
        productDtos: [{
          id: 1, name: '한우', price: 10000, title: '한우팝니다', manufacturer: '한국', imformation: '맛있음',
        },
        {
          id: 2, name: '닭가슴살', price: 1000, title: '닭가슴살팝니다', manufacturer: '한국', imformation: '맛없음',
        },
        ],
        pageDtos: [{ number: 1 }],
      }),
    );
  }),

  rest.get(`${baseUrl}/products/1`, async (req, res, ctx) => res(
    ctx.json({
      id: 1,
      name: '한우',
      price: 10000,
      title: '한우팝니다',
      manufacturer: '한국',
      imformation: '맛있음',
    }),
  )),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => {
    await res(
      ctx.json({
        orderDtos: [{
          id: 1, manufacturer: '한국', title: '한우', receiver: '오진성',
        },
        {
          id: 2, manufacturer: '한국', title: '닭가슴살', receiver: '오진성',
        },
        ],
        pageDtos: [{ number: 1 }],
      }),
    );
  }),
);

export default server;
