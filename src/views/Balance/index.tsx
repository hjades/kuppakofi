import { Spin, Typography } from 'antd';
import to from 'await-to-js';
import React, { FC, useEffect, useState } from 'react';
import Stats from './Stats';

interface BalanceProps {}

const Balance: FC = ({}: BalanceProps) => {
  const [balances, setBalances] = useState([] as Balance.Detail[]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const as_of_time = new Date().toISOString();

    setLoading(true);

    const tokenResp = await fetch('/api/token');
    const token = (await tokenResp.json()).access_token;

    const url = new URL(
      'https://api-m.sandbox.paypal.com/v1/reporting/balances',
    );
    url.search = new URLSearchParams({
      as_of_time,
    }).toString();

    const [err, apiResp] = await to<Balance.ListAllResponse>(
      fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );

    if (!err && apiResp) {
      const balanceResp = await apiResp.json();
      setBalances(balanceResp.balances);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Typography.Title level={3}>Balances</Typography.Title>
      <section style={{ marginTop: 24 }}>
        {loading ? <Spin /> : <Stats balances={balances} />}
      </section>
    </>
  );
};

export default Balance;
