/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  env: {
    STORAGE_URL: "https://storage.googleapis.com/g-icons",
  },
  mount: {
    // directory name: 'build directory'
    public: "/",
    src: "/dist",
  },
  plugins: ["@snowpack/plugin-svelte"],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  // exclude: ['**/node_modules/**', './public/icons/**'],
  optimize: {
    /* Example: Bundle your final build: */
    bundle: true,
    minify: true,
    target: "es2019",
  },
  packageOptions: {
    /* Enable streaming imports */
    // source: "remote-next",
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
