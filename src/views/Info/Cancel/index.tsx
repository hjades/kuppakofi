import { Button, Result } from 'antd';
import React from 'react';

const Cancel = () => {
  const handleClose = () => {
    window.close();
  };

  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={[
        <Button type="primary" onClick={handleClose}>
          Close
        </Button>,
      ]}
    />
  );
};

export default Cancel;
