import { ShoppingOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Card, Collapse, Drawer, Spin } from 'antd';
import type { AlertProps } from 'antd/lib/alert';
import type { Link } from 'paypal-rest-sdk';
import React, { useEffect, useState } from 'react';
import {
  captureOrder,
  createOrder,
  showOrder,
  updateOrder
} from '../../api/paypal';

const { Meta } = Card;

interface AdvancedPaymentProps {}

const AdvancedPayment: React.FC = ({}: AdvancedPaymentProps) => {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState('' as string);
  const [detailType, setDetailType] = useState('success' as AlertProps['type']);
  const [oid, setOid] = useState('' as string);
  const [updated, setUpdated] = useState(false as Boolean);
  const [loading, setLoading] = useState('' as string);
  const [links, setLinks] = useState([] as Link[]);

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
    const [err, resp] = await createOrder();
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
    const [err, resp] = await updateOrder(oid);
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
            <Button onClick={handleClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={handleClose} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {loading ? (
          <Spin tip={loading}></Spin>
        ) : (
          <>
            <Collapse defaultActiveKey={['1', '2']}>
              <Collapse.Panel header="Customer" key="1">
                <p>
                  {links &&
                    links.length !== 0 &&
                    links.map((link) => (
                      <Button onClick={handleClickLink(link)}>
                        {link.rel}
                      </Button>
                    ))}
                </p>
              </Collapse.Panel>
              <Collapse.Panel header="Server" key="2">
                {!updated && (
                  <Button onClick={handleUpdate}>Update Order</Button>
                )}
                {oid && <Button onClick={handleCapture}>Capture Order</Button>}
                {oid && <Button onClick={handleShow}>Fetch Order</Button>}
                {!oid && <Button onClick={handleCreate}>Create Order</Button>}
              </Collapse.Panel>
            </Collapse>
            {detail && (
              <>
                <p>Response:</p>
                <Alert message={detail} type={detailType} />
              </>
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default AdvancedPayment;
