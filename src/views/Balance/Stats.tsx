import { Statistic } from 'antd';
import React, { FC } from 'react';

interface StatsProps {
  balances: Balance.Detail[];
}

const Stats: FC<StatsProps> = ({ balances = [] }) => {
  return (
    <>
      {balances.map((balance) => (
        <Statistic
          key={balance.currency}
          title={balance.currency}
          value={balance.total_balance.value}
          suffix={balance.total_balance.currency_code}
        />
      ))}
    </>
  );
};

export default Stats;
