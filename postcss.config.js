const rollupConfig = require('./rollup.config');

module.exports = {
  plugins: {
    'postcss-cssnext': {},
    'postcss-header': {
      header: rollupConfig.output[0].banner,
    },
    stylefmt: {},
  },
};
