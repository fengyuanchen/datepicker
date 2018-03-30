const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const pkg = require('./package');

const now = new Date();
const banner = `/*!
 * Datepicker v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2014-${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`;

module.exports = {
  input: 'src/js/index.js',
  output: [
    {
      banner,
      file: 'dist/datepicker.js',
      format: 'umd',
      name: 'datepicker',
      globals: {
        jquery: 'jQuery',
      },
    },
    {
      banner,
      file: 'dist/datepicker.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/datepicker.esm.js',
      format: 'es',
    },
    {
      banner,
      file: 'docs/js/datepicker.js',
      format: 'umd',
      name: 'datepicker',
      globals: {
        jquery: 'jQuery',
      },
    },
  ],
  external: ['jquery'],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
