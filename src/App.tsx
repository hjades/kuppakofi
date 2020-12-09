import { Layout, Menu } from 'antd';
import DatePicker from 'components/DatePicker';
import React from 'react';
import './App.css';

interface AppProps {}

const { Header, Content, Footer } = Layout;

function App({}: AppProps) {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380 }}>Content</div>
        <DatePicker />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        KuppaKofi ©2020 Created by Jade with ♥️
      </Footer>
    </Layout>
  );
}

export default App;
