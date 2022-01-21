/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  exclude: [
    "**/node_modules/**/*",
    "**/public/icons/dark/**/*",
    "**/public/icons/light/**/*",
    "**/public/icons/blue/**/*",
    "**/public/icons/red/**/*",
  ],
  plugins: ["@snowpack/plugin-svelte", "@snowpack/plugin-webpack"],
  packageOptions: {
    /* Enable streaming imports */
    // source: "remote-next",
  },
};
