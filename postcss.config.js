const pkg = require('./package');

const now = new Date();

module.exports = {
  plugins: {
    'postcss-cssnext': {},
    'postcss-banner': {
      important: true,
      banner: `Datepicker v${pkg.version}
https://github.com/${pkg.repository}

Copyright (c) 2014-${now.getFullYear()} ${pkg.author.name}
Released under the ${pkg.license} license

Date: ${now.toISOString()}`,
    },
    stylefmt: {},
  },
};
