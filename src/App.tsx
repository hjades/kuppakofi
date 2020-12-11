import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import Balance from 'views/Balance';
import Home from 'views/Home';
import Shop from 'views/Shop';
import Transactions from 'views/Transactions';
import './App.css';

interface AppProps {}

const { Header, Content, Footer } = Layout;

function App({}: AppProps) {
  const location = useLocation();

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/shop">
            <Link to="/shop">Shop</Link>
          </Menu.Item>
          <Menu.Item key="/transactions">
            <Link to="/transactions">Transactions</Link>
          </Menu.Item>
          <Menu.Item key="/balance">
            <Link to="/balance">Balance</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <Switch>
            <Route path="/transactions">
              <Transactions />
            </Route>
            <Route path="/balance">
              <Balance />
            </Route>
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
