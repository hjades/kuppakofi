import to from 'await-to-js';
import axios from 'axios';

const getAccessToken = async () => {
  const tokenResp = await fetch('/api/token');
  const token = (await tokenResp.json())?.access_token;
  return token;
};

export const createOrder = async (amount: Number) => {
  const token = await getAccessToken();
  return to(
    axios({
      method: 'POST',
      url: '/v2/checkout/orders',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: String(amount),
            },
          },
        ],
        application_context: {
          return_url: 'http://localhost:8080/info/success',
          cancel_url: 'http://localhost:8080/info/cancel',
        },
      },
    }),
  );
};

export const updateOrder = async (oid: string, amount: Number) => {
  const token = await getAccessToken();
  return to(
    axios({
      method: 'PATCH',
      url: `/v2/checkout/orders/${oid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: [
        {
          op: 'replace',
          path: "/purchase_units/@reference_id=='default'/amount",
          value: {
            currency_code: 'USD',
            value: String(amount),
          },
        },
      ],
    }),
  );
};

export const showOrder = async (oid: string) => {
  const token = await getAccessToken();
  return to(
    axios({
      method: 'GET',
      url: `/v2/checkout/orders/${oid}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: null,
    }),
  );
};

export const authorizeOrder = async (oid: string) => {
  const token = await getAccessToken();
  return to(
    axios({
      method: 'POST',
      url: `/v2/checkout/orders/${oid}/authorize`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: null,
    }),
  );
};

export const captureOrder = async (oid: string) => {
  const token = await getAccessToken();
  return to(
    axios({
      method: 'POST',
      url: `/v2/checkout/orders/${oid}/capture`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: null,
    }),
  );
};
