import React from 'react';
import AdvancedPaymentCard from './AdvancedPayments';
import StandardPaymentsCard from './StandardPayments';

interface ShopProps {}

const Shop: React.FC = ({}: ShopProps) => {
  return (
    <section>
      <StandardPaymentsCard />
      <AdvancedPaymentCard />
    </section>
  );
};

export default Shop;
