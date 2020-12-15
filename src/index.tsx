import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import Cancel from 'views/Info/Cancel';
import Success from 'views/Info/Success';
import App from './App';
import './index.css';

const history = createBrowserHistory();

const paypalOptions = {
  'client-id':
    import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID ||
    'Ad8X9SXuqr7REcI2tKg9HzQ3C8ZEexFHm6Hnl3k7n3AM1sD5SYsidx3mPIsbc3Jtx02E9V8SjKGkSVIX',
  vault: true,
};

ReactDOM.render(
  <PayPalScriptProvider options={paypalOptions}>
    <Router history={history}>
      <Switch>
        <Route path="/info/success">
          <Success />
        </Route>
        <Route path="/info/cancel">
          <Cancel />
        </Route>
        <Route component={App} />
      </Switch>
    </Router>
  </PayPalScriptProvider>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
