const axios = require('axios').default;
const to = require('await-to-js').to;

const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.SECRET}`,
  ).toString('base64');
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  const [err, resp] = await to(
    axios({
      method: 'POST',
      url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      headers: {
        Authorization: `Basic ${auth}`,
      },
      data,
    }),
  );
  if (err) {
    console.log(err);
  }
  return resp.data.access_token;
};

const createOrder = async () => {
  const token = await getAccessToken();
  const [err, resp] = await to(
    axios({
      method: 'POST',
      url: 'https://api.sandbox.paypal.com/v2/checkout/orders',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '100.00',
            },
          },
        ],
      },
    }),
  );
  return resp.data;
};

const updateOrder = async (oid, data) => {
  const token = await getAccessToken();
  const [err, resp] = await to(
    axios({
      method: 'POST',
      url: `https://api.sandbox.paypal.com/v2/checkout/orders/${oid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    }),
  );
  return resp.data;
};

const showOrder = async (oid) => {
  const token = await getAccessToken();
  const [err, resp] = await to(
    axios({
      method: 'GET',
      url: `https://api.sandbox.paypal.com/v2/checkout/orders/${oid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
  return resp.data;
};

const authorizeOrder = async (oid) => {
  const token = await getAccessToken();
  const [err, resp] = await to(
    axios({
      method: 'POST',
      url: `https://api.sandbox.paypal.com/v2/checkout/orders/${oid}/authorize`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
  return resp;
};

const captureOrder = async (oid) => {
  const token = await getAccessToken();
  const [err, resp] = await to(
    axios({
      method: 'POST',
      url: `https://api.sandbox.paypal.com/v2/checkout/orders/${oid}/capture`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
  return resp;
};

module.exports = {
  createOrder,
  updateOrder,
  showOrder,
  authorizeOrder,
  captureOrder,
};
