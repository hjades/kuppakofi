import { Button, Typography } from 'antd';
import type { TablePaginationConfig } from 'antd/lib/table';
import DatePicker from 'components/DatePicker';
import type { RangeValue } from 'rc-picker/lib/interface';
import React, { FC, useState } from 'react';
import TransactionsTable from './TransactionsTable';

const { RangePicker } = DatePicker;

interface TransactionsProps {}

const Transactions: FC = ({}: TransactionsProps) => {
  const [value, setValue] = useState(null as RangeValue<Date>);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async (pagination: TablePaginationConfig) => {
    if (!value) {
      return;
    }
    const [start_date, end_date] = (value as Date[]).map((v) =>
      new Date(v).toISOString(),
    );

    setLoading(true);

    const tokenResp = await fetch('/api/token');
    const token = (await tokenResp.json()).access_token;

    const url = new URL(
      'https://api-m.sandbox.paypal.com/v1/reporting/transactions',
    );
    url.search = new URLSearchParams({
      start_date,
      end_date,
      page: String(pagination.current || 1),
      page_size: String(pagination.pageSize || 10),
    }).toString();

    const transResp = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const trans = await transResp.json();

    setData(trans.transaction_details);
    setTotal(trans.total_items);
    setLoading(false);
  };

  return (
    <>
      <Typography.Title level={3}>Transaction Search</Typography.Title>
      <section>
        <RangePicker value={value} onChange={setValue} />
        <Button
          type="primary"
          disabled={!value}
          onClick={() => fetchData({})}
          style={{ marginLeft: 8 }}
        >
          Search
        </Button>
      </section>
      <section style={{ marginTop: 24 }}>
        <TransactionsTable
          fetchData={fetchData}
          data={data}
          total={total}
          loading={loading}
        />
      </section>
    </>
  );
};

export default Transactions;
