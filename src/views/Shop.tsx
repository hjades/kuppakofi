import React from 'react';
import StandardPaymentsCard from './StandardPayments';

interface ShopProps {}

const Shop: React.FC = ({}: ShopProps) => {

  return (
    <section>
      <StandardPaymentsCard />
    </section>
  );
};

export default Shop;
