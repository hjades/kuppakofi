import { ShoppingOutlined } from '@ant-design/icons';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Avatar, Button, Card, Drawer, notification } from 'antd';
import to from 'await-to-js';
import React, { useState } from 'react';

const { Meta } = Card;

interface StandardPaymentsProps {}

const StandardPayments: React.FC = ({}: StandardPaymentsProps) => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handleCreateOrder = async (data: any, actions: any) => {
    const payload = {
      purchase_units: [
        {
          amount: {
            value: 2.0,
          },
        },
      ],
    };
    const [err, orderId] = await to(actions.order.create(payload));
    notification.open({
      message: err ? 'ERR:' + err.toString() : 'Notification Title' + orderId,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  const handleCreateSubscription = (data: any, actions: any) =>
    actions.subscription.create({
      plan_id: 'P-9LH54428VX709124SL7IJMNA',
    });

  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[<ShoppingOutlined onClick={handleOpen} />]}
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="Standard Payments"
          description="Quick, basic, easy payment buttons. (One-time sale)"
        />
      </Card>
      <Drawer
        title="Standard Payments"
        width={720}
        onClose={handleClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={handleClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={handleClose} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <>
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
        </>
      </Drawer>
    </>
  );
};

export default StandardPayments;
