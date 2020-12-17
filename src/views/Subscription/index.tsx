import { ShoppingOutlined } from '@ant-design/icons';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Collapse,
  Drawer,
  Spin,
  Typography,
} from 'antd';
import type { AlertProps } from 'antd/lib/alert';
import { getPlans } from 'api/paypal/subscription';
import type { Link } from 'paypal-rest-sdk';
import React, { useState } from 'react';

const { Paragraph } = Typography;
const { Meta } = Card;

interface SubscriptionProps {}

const EnhancedButton = (props: any) => (
  <Button style={{ marginRight: 8 }} {...props} />
);

const Subscription: React.FC<SubscriptionProps> = ({}) => {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState('' as string);
  const [detailType, setDetailType] = useState('success' as AlertProps['type']);
  const [loading, setLoading] = useState('' as string);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClickLink = (link: Link) => () => {
    window.open(link.href, '', 'menubar=0,height=700,width=500');
  };

  const handleGetPlans = async () => {
    setLoading('Getting Plans...');
    const [err, resp] = await getPlans();
    if (err) {
      setDetail(JSON.stringify(err));
      setDetailType('error');
      setLoading('');
      return;
    }
    setDetail(JSON.stringify(resp?.data.plans));
    setDetailType('success');
    setLoading('');
  };

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
          title="Subscription"
          description="Quick, basic, easy subscribe buttons."
        />
      </Card>
      <Drawer
        title="Subscription"
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
            <EnhancedButton onClick={handleClose}>Cancel</EnhancedButton>
          </div>
        }
      >
        <Spin tip={loading} spinning={!!loading} delay={100}>
          <Collapse defaultActiveKey={['Server', 'Customer']}>
            <Collapse.Panel header="Customer" key="Customer">
              <p>Customer Content</p>
            </Collapse.Panel>
            <Collapse.Panel header="Server" key="Server">
              <Paragraph>
                <blockquote>Subscription Plans:</blockquote>
                <EnhancedButton onClick={handleGetPlans} type="primary">
                  Get Plans
                </EnhancedButton>
              </Paragraph>
            </Collapse.Panel>
          </Collapse>
          <br />
          {detail && (
            <Alert
              message="Response"
              description={detail}
              type={detailType}
              showIcon
            />
          )}
        </Spin>
      </Drawer>
    </>
  );
};

export default Subscription;
