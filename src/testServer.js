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

    if (!userName) {
      return res(
        ctx.status(400),
        ctx.json({
          code: 1002,
          message: '아이디를 입력해주세요.',
        }),
      );
    }

    if (!password) {
      return res(
        ctx.status(400),
        ctx.json({
          code: 1002,
          message: '비밀번호를 입력해주세요.',
        }),
      );
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

  rest.get(`${baseUrl}/users`, async (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      name: '오진성',
      amount: 50000,
    }),
  )),

  rest.get(`${baseUrl}/products`, async (req, res, ctx) => {
    const page = await req.url.searchParams.get('page');

    if (page === '1') {
      return res(
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
    }

    return res(
      ctx.status(400),
      ctx.json({
        errorMessage: '해당페이지가 없습니다.',
      }),
    );
  }),

  rest.get(`${baseUrl}/products/:productId`, async (req, res, ctx) => {
    const { productId } = await req.params;

    if (productId === '1') {
      return res(
        ctx.json({
          id: 1,
          name: '한우',
          price: 10000,
          title: '한우팝니다',
          manufacturer: '한국',
          imformation: '맛있음',
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/orders/:orderId`, async (req, res, ctx) => {
    const { orderId } = await req.params;

    if (orderId === '1') {
      return res(
        ctx.json({
          id: 1,
          amount: 1,
          totalPrice: 30000,
          manufacturer: '한국',
          title: '한우',
          receiver: '오진성',
          message: '잘먹어라',
          address: '세종',
          dateOfPurchase: '2022-11-15',
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => {
    const page = await req.url.searchParams.get('page');
    const [, authorization] = await req.headers;

    if (authorization[1] !== 'Bearer Token') {
      return res(
        ctx.status(400),
      );
    }

    if (page === '1') {
      return res(
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
    }

    return res(
      ctx.json({
        orderDtos: [],
        pageDtos: [{ number: 1 }],
      }),
    );
  }),

  rest.post(`${baseUrl}/orders`, async (req, res, ctx) => {
    const { receiver, address } = await req.json();

    if (!receiver || !address) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.status(200),
    );
  }),
);

export default server;
