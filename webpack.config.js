const path = require('path');

const webpack = require('webpack');

HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeENV = process.env.NODE_ENV || 'production';

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    publicPath: '/assets',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', { modules: false }],
          ],
        },
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader' 
      },
      {
        test: /\.(sass|scss|css)$/,
        use: ['style-loader', 'css-loader','sass-loader',]
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '/src'),
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeENV) },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    }),
  ],
};
