import { Layout, Menu, Typography } from 'antd';
import DatePicker from 'components/DatePicker';
import React from 'react';
import { NavLink, Route, Switch, useLocation } from 'react-router-dom';
import Home from 'views/Home';
import Shop from 'views/Shop';
import './App.css';

interface AppProps {}

const { Header, Content, Footer } = Layout;

function App({}: AppProps) {
  const location = useLocation();

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div />
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <NavLink to="/" component={Typography.Link}>
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/shop">
            <NavLink to="/shop" component={Typography.Link}>
              Shop
            </NavLink>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380 }}>Content</div>
        <DatePicker />
        <Switch>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        KuppaKofi ©2020 Created by Jade with ♥️
      </Footer>
    </Layout>
  );
}

export default App;
