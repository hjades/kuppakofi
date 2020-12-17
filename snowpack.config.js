/** @type {import("snowpack").SnowpackUserConfig } */
require('./src/server/index.js');

module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    rollup: {
      plugins: [
        require('rollup-plugin-styles')({
          less: { javascriptEnabled: true },
        }),
      ],
    },
    treeshake: true,
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    '/api': `http://localhost:${process.env.PROXY_PORT || 8081}/api`,
    '/v1': 'https://api-m.sandbox.paypal.com/v1',
    '/v2': 'https://api.sandbox.paypal.com/v2',
  },
  alias: {
    api: './src/api',
    components: './src/components',
    views: './src/views',
  },
};
