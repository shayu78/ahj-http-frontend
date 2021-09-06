/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({}),
      // new OptimizeCssAssetsWebpackPlugin({}),
      new CssMinimizerWebpackPlugin({}),
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
  },
  target: 'browserslist',
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    // new BundleAnalyzerPlugin(),
  ],
});
