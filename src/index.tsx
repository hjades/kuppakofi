import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import './index.css';

const history = createBrowserHistory();

const paypalOptions = {
  'client-id': 'Ad8X9SXuqr7REcI2tKg9HzQ3C8ZEexFHm6Hnl3k7n3AM1sD5SYsidx3mPIsbc3Jtx02E9V8SjKGkSVIX',
  vault: true,
};

ReactDOM.render(
  <PayPalScriptProvider options={paypalOptions}>
    <Router history={history}>
      <App />
    </Router>
  </PayPalScriptProvider>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
