const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.join(__dirname, 'src', 'index'),
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: false,
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'use plugin'
    }),
    // 永远不要在生产环境(production)下启用 HMR
    new webpack.HotModuleReplacementPlugin({})
  ],
};

module.exports = config;