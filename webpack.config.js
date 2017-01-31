const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = '/fatego_memo';

module.exports = {
  entry: 'main.jsx',
  output: {
    path: './docs/',
    filename: 'bundle.js',
    publicPath: publicPath
  },
  devServer: {
    contentBase: 'docs'
  },
  devtool: 'source-map',
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel", 
        query:{
          presets: ['es2015', 'react']
        }
      },
      { 
        test: /\.jsx$/, 
        exclude: /node_modules/, 
        loader: "babel", 
        query:{
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: 'src/404.html',
      inject: false
    }),
    new webpack.DefinePlugin({
      'BASE_PATH': JSON.stringify(publicPath)
    })
  ]
};
