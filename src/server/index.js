require('dotenv').config();
const Koa = require('koa');
const Router = require('@koa/router');
const fetch = require('node-fetch');

const app = new Koa();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// token
app.use(async (ctx, next) => {
  if (ctx.path !== '/api/webhook') {
    let result = {};
    const auth = Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.SECRET}`,
    ).toString('base64');
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const resp = await fetch(
      'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      {
        method: 'post',
        headers: { Authorization: `Basic ${auth}` },
        body: params,
      },
    );
    result = await resp.json();
    const token = result?.access_token;
    ctx.request.header = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  await next();
});

const router = new Router({
  prefix: '/api',
});

router
  .get('/', (ctx) => {
    ctx.body = 'Hello World!';
  })
  .post('/webhook', (ctx) => {
    console.log(ctx);
    ctx.body = '';
  })
  .get('/billing/plans', async (ctx) => {
    let result = {};
    const resp = await fetch(
      'https://api.sandbox.paypal.com/v1/billing/plans',
      {
        method: 'get',
        headers: {
          Authorization: ctx.request.header.Authorization,
          'Content-Type': ctx.request.header['Content-Type'],
        },
      },
    );
    result = await resp.json();
    ctx.body = JSON.stringify(result);
    ctx.set(resp.headers.raw());
  });

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PROXY_PORT || 8081);
