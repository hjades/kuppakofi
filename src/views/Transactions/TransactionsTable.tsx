import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import React, { FC, useState } from 'react';

interface TransactionsTableProps {
  fetchData(pagination: TablePaginationConfig): void;
  data: TransactionDetail[];
  total: number;
  loading: boolean;
}

interface TransactionDetail {
  transaction_info: {
    transaction_id: string;
  };
}

const columns: ColumnsType<TransactionDetail> = [
  {
    title: 'Transaction ID',
    dataIndex: ['transaction_info', 'transaction_id'],
  },
  {
    title: 'Date',
    dataIndex: ['transaction_info', 'transaction_initiation_date'],
    render: (dateStr: string) => new Date(dateStr).toLocaleString(),
  },
  {
    title: 'Subject',
    dataIndex: ['transaction_info', 'transaction_subject'],
  },
  {
    title: 'Amount',
    dataIndex: ['transaction_info', 'transaction_amount'],
    render: (amount: any) => `${amount.currency_code} ${amount.value}`,
  },
  {
    title: 'Fee',
    dataIndex: ['transaction_info', 'fee_amount'],
    render: (amount: any) =>
      amount ? `${amount.currency_code} ${amount.value}` : 0,
  },
];

const TransactionsTable: FC<TransactionsTableProps> = ({
  fetchData = () => {},
  data = [],
  total = 0,
  loading = false,
}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const handleChange = async (pagination: TablePaginationConfig) => {
    await fetchData(pagination);
    setCurrent(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  return (
    <Table
      columns={columns}
      rowKey={(record: TransactionDetail) =>
        record.transaction_info.transaction_id
      }
      dataSource={data}
      pagination={{ current, pageSize, total }}
      loading={loading}
      onChange={handleChange}
    />
  );
};

export default TransactionsTable;
