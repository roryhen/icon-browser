/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    // directory name: 'build directory'
    public: '/',
    src: '/dist'
  },
  plugins: [
    '@snowpack/plugin-svelte'
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  // exclude: ['**/node_modules/**', './public/icons/**'],
  optimize: {
    /* Example: Bundle your final build: */
    "bundle": true,
    "minify": true,
    "target": "es2018"
  },
  packageOptions: {
    /* Enable streaming imports */
    // "source": "remote-next"
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
