import { Typography } from 'antd';
import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface ShopProps {}

const Shop: React.FC = ({}: ShopProps) => {
  const handleCreateOrder = (data: any, actions: any) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            value: 2.0,
          },
        },
      ],
    });

  const handleCreateSubscription = (data: any, actions: any) =>
    actions.subscription.create({
      plan_id: 'P-9LH54428VX709124SL7IJMNA',
    });

  return (
    <Typography.Paragraph>
      Shop
      <PayPalButtons createOrder={handleCreateOrder} />
      <PayPalButtons
        createSubscription={handleCreateSubscription}
        style={{
          shape: 'pill',
          color: 'blue',
          layout: 'horizontal',
          label: 'subscribe',
        }}
      />
    </Typography.Paragraph>
  );
};

export default Shop;
