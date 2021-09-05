/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 9000,
    contentBase: './dist',
    hot: true,
  },
  output: {
    filename: '[name].js',
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: false,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
});
