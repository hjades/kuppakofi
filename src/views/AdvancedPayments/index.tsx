import { ShoppingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Drawer, Spin } from 'antd';
import to from 'await-to-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const { Meta } = Card;

interface AdvancedPaymentProps {}

const AdvancedPayment: React.FC = ({}: AdvancedPaymentProps) => {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState('Click button to create order:' as string);
  const [oid, setOid] = useState('' as string);
  const [isAuth, setIsAuth] = useState(false as Boolean);
  const [loading, setLoading] = useState('' as string);

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

  const handleShow = async () => {
    setLoading('Fetch order...');
    const [err, resp] = await to(axios.get('/api/show_order?oid=' + oid));
    setDetail(JSON.stringify(resp));
    setLoading('');
  };

  const handleCreate = async () => {
    setLoading('Create order...');
    const [err, resp] = await to(axios.get('/api/create_order'));
    setOid(resp?.data.id);
  };

  const handleAuthorize = async () => {
    setLoading('Authorize order...');
    const [err, resp] = await to(axios.get('/api/authorize_order?oid=' + oid));
    setDetail(JSON.stringify(resp));
    setIsAuth(true);
    setLoading('');
  };

  const handleCapture = async () => {
    setLoading('Capture order...');
    const [err, resp] = await to(axios.get('/api/capture_order?oid=' + oid));
    setDetail(JSON.stringify(resp));
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
            <p>{detail}</p>
            {oid ? (
              isAuth ? (
                <Button onClick={handleCapture}>Capture Order</Button>
              ) : (
                <Button onClick={handleAuthorize}>Authorize Order</Button>
              )
            ) : (
              <Button onClick={handleCreate}>Create Order</Button>
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default AdvancedPayment;
