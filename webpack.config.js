/* global __dirname */

var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './_scripts'),
  entry: {
    app: './main.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
          //presets: ['es2015'],

          // All of the plugins of babel-preset-es2015,
          // minus babel-plugin-transform-es2015-modules-commonjs
          plugins: [
              'transform-es2015-template-literals',
              'transform-es2015-literals',
              'transform-es2015-function-name',
              'transform-es2015-arrow-functions',
              'transform-es2015-block-scoped-functions',
              'transform-es2015-classes',
              'transform-es2015-object-super',
              'transform-es2015-shorthand-properties',
              'transform-es2015-computed-properties',
              'transform-es2015-for-of',
              'transform-es2015-sticky-regex',
              'transform-es2015-unicode-regex',
              'check-es2015-constants',
              'transform-es2015-spread',
              'transform-es2015-parameters',
              'transform-es2015-destructuring',
              'transform-es2015-block-scoping',
              'transform-es2015-typeof-symbol',
              ['transform-regenerator', { async: false, asyncGenerators: false }],
          ],
      },
    }]
  },
  plugins: [
      // Avoid publishing files when compilation fails
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery'
      })
  ],
  output: {
    path: path.resolve(__dirname, './js'),
    filename: '[name].bundle.js'
  },
  stats: {
      // Nice colored output
      colors: true
  },
  // Create source maps for the bundle
  devtool: 'source-map',
};
