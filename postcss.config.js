const rollupConfig = require('./rollup.config');

module.exports = {
  plugins: {
    'postcss-cssnext': {},
    'postcss-header': {
      header: rollupConfig.banner,
    },
    stylefmt: {},
  },
};
