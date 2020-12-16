import { Button, Result } from 'antd';
import React from 'react';

const Success = () => {
  const handleClose = () => {
    window.close();
  };
  
  return (
    <Result
      status="success"
      title="Successfully Purchased!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" onClick={handleClose}>
          Close
        </Button>,
      ]}
    />
  );
};

export default Success;
