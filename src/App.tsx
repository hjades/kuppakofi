import { Layout, Menu, Typography } from 'antd';
import DatePicker from 'components/DatePicker';
import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
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
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/" component={Typography.Link}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/shop">
            <Link to="/shop" component={Typography.Link}>
              Shop
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <DatePicker />
          <Switch>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>KuppaKofi ♥️ ©2020</Footer>
    </Layout>
  );
}

export default App;
