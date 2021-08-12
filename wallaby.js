module.exports = (w) => ({
  files: ["src/**/*.mjs"],

  tests: ["test/**/*.spec.mjs"],

  env: {
    type: "node",
  },

  compiler: {},
});
