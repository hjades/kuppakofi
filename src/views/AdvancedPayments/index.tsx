import { ShoppingOutlined } from '@ant-design/icons';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Collapse,
  Drawer,
  Slider,
  Spin,
  Typography
} from 'antd';
import type { AlertProps } from 'antd/lib/alert';
import type { Link } from 'paypal-rest-sdk';
import React, { useEffect, useState } from 'react';
import {
  captureOrder,
  createOrder,
  showOrder,
  updateOrder
} from '../../api/paypal';

const { Paragraph } = Typography;
const { Meta } = Card;

interface AdvancedPaymentProps {}

const EnhancedButton = (props: any) => (
  <Button style={{ marginRight: 8 }} {...props} />
);

const AdvancedPayment: React.FC = ({}: AdvancedPaymentProps) => {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState('' as string);
  const [detailType, setDetailType] = useState('success' as AlertProps['type']);
  const [oid, setOid] = useState('' as string);
  const [updated, setUpdated] = useState(false as Boolean);
  const [loading, setLoading] = useState('' as string);
  const [links, setLinks] = useState([] as Link[]);
  const [amount, setAmount] = useState(200);

  useEffect(() => {
    if (oid) {
      handleShow();
    }
  }, [oid]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClickLink = (link: Link) => () => {
    window.open(link.href, '', 'menubar=0,height=700,width=500');
  };

  const handleShow = async () => {
    setLoading('Fetch order...');
    const [err, resp] = await showOrder(oid);
    if (err) {
      setDetail(JSON.stringify(err));
      setDetailType('error');
      setLoading('');
      return;
    }
    setDetail(JSON.stringify(resp));
    setDetailType('success');
    setLoading('');
  };

  const handleCreate = async () => {
    setLoading('Create order...');
    const [err, resp] = await createOrder(amount);
    if (err) {
      setDetail(JSON.stringify(err));
      setDetailType('error');
      setLoading('');
      return;
    }
    setOid(resp?.data.id || '');
    setLinks(resp?.data.links || []);
  };

  const handleUpdate = async () => {
    setLoading('Update order...');
    const [err, resp] = await updateOrder(oid, amount);
    if (err) {
      setDetail(JSON.stringify(err));
      setDetailType('error');
      setLoading('');
      return;
    }
    setDetail(JSON.stringify(resp));
    setDetailType('success');
    setUpdated(true);
    setLoading('');
  };

  const handleCapture = async () => {
    setLoading('Capture order...');
    const [err, resp] = await captureOrder(oid);
    if (err) {
      setDetail(JSON.stringify(err));
      setDetailType('error');
      setLoading('');
      return;
    }
    setDetail(JSON.stringify(resp));
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
          title="Advanced Payment"
          description="Quick, basic, easy payment buttons. (One-time sale)"
        />
      </Card>
      <Drawer
        title="Advanced Payment"
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
              <p>
                {links &&
                  links.length !== 0 &&
                  links.filter(link => link.method === 'GET').map((link) => (
                    <EnhancedButton onClick={handleClickLink(link)}>
                      {link.rel}
                    </EnhancedButton>
                  ))}
              </p>
            </Collapse.Panel>
            <Collapse.Panel header="Server" key="Server">
              {oid && (
                <Paragraph>
                  <blockquote>For fetch order detail:</blockquote>
                  <EnhancedButton onClick={handleShow} type="primary" ghost>
                    Fetch Order
                  </EnhancedButton>
                </Paragraph>
              )}

              {!oid && (
                <Paragraph>
                  <blockquote>For create order with amount:</blockquote>
                  <Slider
                    defaultValue={amount}
                    min={0}
                    max={1000}
                    onChange={setAmount}
                  />

                  <EnhancedButton onClick={handleCreate}>
                    Create Order
                  </EnhancedButton>
                </Paragraph>
              )}
              {oid && (
                <Paragraph>
                  <blockquote>For update order amount:</blockquote>
                  <Slider
                    defaultValue={amount}
                    min={0}
                    max={1000}
                    onChange={setAmount}
                  />
                  <EnhancedButton onClick={handleUpdate}>
                    Update Order
                  </EnhancedButton>
                </Paragraph>
              )}

              {oid && (
                <Paragraph>
                  <blockquote>For capture order amount:</blockquote>
                  <EnhancedButton onClick={handleCapture} type="primary">
                    Capture Order
                  </EnhancedButton>
                </Paragraph>
              )}
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

export default AdvancedPayment;
