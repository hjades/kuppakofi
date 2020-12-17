import { Row } from 'antd';
import React from 'react';
import AdvancedPaymentCard from './AdvancedPayments';
import StandardPaymentsCard from './StandardPayments';
import SubscriptionCard from './Subscription';

interface ShopProps {}

const Shop: React.FC = ({}: ShopProps) => {
  return (
    <Row>
      <StandardPaymentsCard />
      <AdvancedPaymentCard />
      <SubscriptionCard />
    </Row>
  );
};

export default Shop;
