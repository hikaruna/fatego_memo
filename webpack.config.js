const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
          presets: ['es2015']
        }
      },
      { 
        test: /\.jsx$/, 
        exclude: /node_modules/, 
        loader: "babel", 
        query:{
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.yml$/,
        loader: 'yml'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        //loader: 'style-loader!css-loader'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?mimetype=image/svg+xml' },
      { test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?mimetype=application/font-woff' }
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
    }),
    new ExtractTextPlugin('bundle.css')
  ]
};
