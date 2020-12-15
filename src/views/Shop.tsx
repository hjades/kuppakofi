import { Row } from 'antd';
import React from 'react';
import AdvancedPaymentCard from './AdvancedPayments';
import StandardPaymentsCard from './StandardPayments';

interface ShopProps {}

const Shop: React.FC = ({}: ShopProps) => {
  return (
    <Row>
      <StandardPaymentsCard />
      <AdvancedPaymentCard />
    </Row>
  );
};

export default Shop;
