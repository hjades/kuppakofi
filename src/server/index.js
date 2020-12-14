require('dotenv').config();
const Koa = require('koa');
const Router = require('@koa/router');
const fetch = require('node-fetch');
const {
  createOrder,
  updateOrder,
  showOrder,
  authorizeOrder,
  captureOrder,
} = require('./paypal');

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

const router = new Router({
  prefix: '/api',
});

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .get('/token', async (ctx) => {
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
    ctx.body = JSON.stringify(result);
  })
  .get('/create_order', async (ctx) => {
    const result = await createOrder();
    ctx.body = JSON.stringify(result);
  })
  .get('/update_order', async (ctx) => {
    const result = await updateOrder(ctx.request.query.oid);
    ctx.body = JSON.stringify(result);
  })
  .get('/show_order', async (ctx) => {
    const result = await showOrder(ctx.request.query.oid);
    ctx.body = JSON.stringify(result);
  })
  .get('/authorize_order', async (ctx) => {
    const result = await authorizeOrder(ctx.request.query.oid);
    ctx.body = JSON.stringify(result);
  })
  .get('/capture_order', async (ctx) => {
    const result = await captureOrder(ctx.request.query.oid);
    ctx.body = JSON.stringify(result);
  });

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PROXY_PORT || 8081);
