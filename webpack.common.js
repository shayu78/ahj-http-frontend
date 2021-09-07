/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
// const { HotModuleReplacementPlugin } = require('webpack');

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader',
  ];

  if (extra) {
    if (Array.isArray(extra)) loaders.push(...extra);
    else loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    // main: './index.js',
    main: ['@babel/polyfill', './index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new Dotenv({ systemvars: true }),
    // new HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.less$/i,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders(['postcss-loader', 'sass-loader']),
      },
      {
        test: /\.(?:ico|png|jpe?g|svg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext]',
        },
      },
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.csv$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript'),
        },
      },
      /*      or
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  options: babelOptions(),
                },
                'ts-loader',
              ],
            }, */
    ],
  },
};
